const axios = require('axios');
const httpSignature = require('@peertube/http-signature');
const { createHash } = require('crypto');

const config = require('../../utils/config.js');
const db = require('../../utils/database.ts');

const getKey = require('./getKey.js');

async function validateRequest(req, res) {
	var host = req.headers.host;

	var digest = req.headers.digest;
	var digest = digest.split(/=(.*)/s);

	var publicKey = getKey(req.body.actor);

	const parsedSig = httpSignature.parseRequest(req);

	// checks if the host is the same as the instance url, or if it even exists on the request
	if (
		host ||
		host ==
			config.url
				.replace('https://', '')
				.replace('http://', '')
				.replace('/', '')
	) {
		console.log('[ap] host matches');
	} else {
		console.log(
			'[ap] uh-oh! a request was sent that mismatches with the current host'
		);
		return res
			.status(400)
			.json({ message: 'host did not match instance configuration' });
	}

	// checks if digest is present
	if (digest[1]) {
		console.log('[ap] digest present');
	} else {
		console.log(
			'[ap] what? a request was sent that does not have a digest'
		);
		return res.status(400).json({ message: 'digest missing' });
	}

	// checks if the digest is the right algorithim
	if (digest[0] === 'SHA-256') {
		console.log('[ap] valid digest');
	} else {
		console.log('[ap] uh-oh! a request was sent with an invalid digest');
		return res.status(400).json({ message: 'digest invalid' });
	}

	// ensure digest is good
	if (
		createHash('sha256').update(req.body.toString()).digest('base64') ===
		digest
	) {
		console.log('[ap] valid digest');
	} else {
		console.log('[ap] uh-oh! a request was sent with an invalid digest');
		return res.status(400).json({ message: 'digest invalid' });
	}

	// make sure signature is good
	if (httpSignature.verifySignature(parsedSig, publicKey)) {
		console.log('[ap] valid signature');
	} else {
		console.log('[ap] uh-oh! a request was sent with an invalid signature');
		return res.status(400).json({ message: 'signature invalid' });
	}
}

module.exports = validateRequest;
