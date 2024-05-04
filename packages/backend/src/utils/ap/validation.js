const config = require('../config.js');
const db = require('../database.ts');

const crypto = require('crypto');

async function validateRequest(req, res) {
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
		console.log('[ap] host header did not match configuration');
		return res
			.status(400)
			.json({ message: 'host doesnt match instance config' });
	} else {
		console.log('[ap] host header matches configuration');
	}

	if (!req.headers.digest) {
		console.log('[ap] digest not present');
		return res.status(400).json({ message: 'digest not present' });
	} else {
		console.log('[ap] digest present');
	}

	if (!req.headers.digest.startsWith('SHA-256=')) {
		console.log('[ap] digest did not start with SHA-256=');
		return res
			.status(400)
			.json({ message: 'digest did not start with SHA-256=' });
	} else {
		console.log('[ap] digest started with SHA-256=');
	}

	if (!req.body) {
		console.log('[ap] body not present');
		return res.status(400).json({ message: 'body not present' });
	} else {
		console.log('[ap] body present');
	}

	if (!req.headers.signature) {
		console.log('[ap] signature in headers not present');
		return res
			.status(400)
			.json({ message: 'signature in headers not present' });
	} else {
		console.log('[ap] signature in headers present');
	}

	var digestValid = validateDigest(
		req,
		req.headers.digest.replace('SHA-256=', '')
	);

	if (!digestValid) {
		console.log('[ap] digest invalid');
		return res.status(400).json({ message: 'digest invalid' });
	} else {
		console.log('[ap] digest valid');
	}

	return res.status(400).send();
}

function validateDigest(req, digest) {
	if (req && digest) {
		return (
			crypto.createHash('sha256').update(req.body).digest('base64') ===
			digest
		);
	} else {
		console.log('[ap validateDigest] body or digest missing');
		return false;
	}
}

async function validateSignature(req, res) {}

module.exports = validateRequest;