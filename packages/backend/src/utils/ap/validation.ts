import config from '../config';
import logger from '../logger';

import crypto from 'crypto';
import httpSignature from '@peertube/http-signature';

import getRemoteActor from './getRemoteActor';

export default async function validateRequest(req, res) {
	if (!req.headers.host) {
		return res.status(400).json({ message: 'missing host' });
	}

	if (
		req.headers.host !==
		config.url
			.replace('https://', '')
			.replace('http://', '')
			.replace('/', '')
	) {
		logger('error', 'ap', 'host header did not match configuration');
		return res
			.status(400)
			.json({ message: 'host doesnt match instance config' });
	} else {
		logger('error', 'ap', 'host header matches configuration');
	}

	if (!req.headers.digest) {
		logger('error', 'ap', 'digest not present');
		return res.status(400).json({ message: 'digest not present' });
	} else {
		logger('debug', 'ap', 'digest present');
	}

	if (!req.headers.digest.startsWith('SHA-256=')) {
		logger('error', 'ap', 'digest did not start with SHA-256=');
		return res
			.status(400)
			.json({ message: 'digest did not start with SHA-256=' });
	} else {
		logger('debug', 'ap', 'digest started with SHA-256=');
	}

	if (!req.body) {
		logger('error', 'ap', 'body not present');
		return res.status(400).json({ message: 'body not present' });
	} else {
		logger('debug', 'ap', 'body present');
	}

	if (!req.headers.signature) {
		logger('error', 'ap', 'signature header not present');
		return res
			.status(400)
			.json({ message: 'signature header not present' });
	} else {
		logger('debug', 'ap', 'signature header present');
	}

	var digestValid = validateDigest(
		req,
		req.headers.digest.replace('SHA-256=', '')
	);

	if (!digestValid) {
		logger('error', 'ap', 'digest invalid');
		return res.status(400).json({ message: 'digest invalid' });
	} else {
		logger('debug', 'ap', 'digest valid');
	}

	var grabbedActor = await getRemoteActor(JSON.parse(req.body).actor);

	logger('debug', 'ap', grabbedActor);

	if (!grabbedActor) {
		logger('error', 'ap', 'actor not properly grabbed');
		return res.status(500).send();
	} else if (grabbedActor === 'gone') {
		return res.status(200).send();
	} else if (grabbedActor.suspended) {
		return res.status(200).send();
	} else {
		var parsedRequest = httpSignature.parseRequest(req, {
			headers: ['(request-target)', 'digest', 'host', 'date']
		});
		httpSignature.verifySignature(parsedRequest, grabbedActor.public_key);
	}
}

function validateDigest(req, digest) {
	if (req && digest) {
		return (
			crypto.createHash('sha256').update(req.body).digest('base64') ===
			digest
		);
	} else {
		logger('error', 'ap', 'body or digest missing');
		return false;
	}
}
