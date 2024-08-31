import config from '../config.js';
import logger from '../logger.js';
import getRemoteActor from './getRemoteActor.js';
import httpSignature from '@peertube/http-signature';
import crypto from 'crypto';

export default async function validateRequest(req) {
	if (!req.headers.host) {
		return { status: 400, message: 'missing host' };
	}

	if (req.headers.host !== new URL(config.get().url).host) {
		logger.error('ap', 'host header did not match configuration');
		return { status: 400, message: 'host doesnt match instance config' };
	} else {
		logger.debug('ap', 'host header matches configuration');
	}

	if (!req.body) {
		logger.error('ap', 'body not present');
		return { status: 400, message: 'body not present' };
	} else {
		logger.debug('ap', 'body present');
	}

	if (!req.headers.digest) {
		logger.error('ap', 'digest not present');
		return { status: 400, message: 'digest not present' };
	} else {
		logger.debug('ap', 'digest present');
	}

	if (!req.headers.digest.startsWith('SHA-256=')) {
		logger.error('ap', 'digest did not start with SHA-256=');
		return { status: 400, message: 'digest did not start with SHA-256=' };
	} else {
		logger.debug('ap', 'digest started with SHA-256=');
	}

	if (!req.headers.signature) {
		logger.error('ap', 'signature header not present');
		return { status: 400, message: 'signature header not present' };
	} else {
		logger.debug('ap', 'signature header present');
	}

	let digestValid = validateDigest(
		req,
		req.headers.digest.replace('SHA-256=', '')
	);

	if (!digestValid) {
		logger.error('ap', 'digest invalid');
		return { status: 400, message: 'digest invalid' };
	} else {
		logger.debug('ap', 'digest valid');
	}

	let grabbedActor = await getRemoteActor(JSON.parse(req.body).actor);

	if (!grabbedActor) {
		logger.error('ap', 'actor not properly grabbed');

		return { status: 500, message: 'actor not properly grabbed' };
	} else if (grabbedActor === 'gone') {
		// they aren't in the database and cannot be fetched, accept activity and just pretend something happened
		return {
			status: 200,
			message: 'actor gone, pretending i did something'
		};
	} else if (grabbedActor.suspended) {
		return { status: 200, message: 'actor suspended, ignoring' };
	} else {
		let parsedRequest = httpSignature.parseRequest(req, {
			headers: ['(request-target)', 'digest', 'host', 'date']
		});
		httpSignature.verifySignature(parsedRequest, grabbedActor.public_key);
		return { status: 202, message: 'all good' };
	}
}

function validateDigest(req, digest) {
	if (req && digest) {
		return (
			crypto.createHash('sha256').update(req.body).digest('base64') ===
			digest
		);
	} else {
		logger.error('ap', 'body or digest missing');
		return false;
	}
}
