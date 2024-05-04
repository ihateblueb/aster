const config = require('../config.js');
const db = require('../database.ts');

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
		var signature = req.headers.signature;
		console.log('[ap] signature in headers present');
	}

	if (!signature.keyId) {
		console.log('[ap] signature keyId not present');
		return res.status(400).json({ message: 'signature keyId not present' });
	} else {
		console.log('[ap] signature keyId present');
	}

	if (signature.algorithm !== 'rsa-sha256') {
		console.log('[ap] signature algorithm invalid');
		return res
			.status(400)
			.json({ message: 'signature algorithim invalid' });
	} else {
		console.log('[ap] signature algorithm valid');
	}

	if (!signature.signature) {
		console.log('[ap] signature not present');
		return res.status(400).json({ message: 'signature not present' });
	} else {
		console.log('[ap] signature present');
	}

	return res.status(400).send();
}

async function validateSignature(req, res) {}

module.exports = validateRequest;
