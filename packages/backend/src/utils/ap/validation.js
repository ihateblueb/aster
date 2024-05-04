async function validateRequest(req, res) {
	if (!req.headers.host) {
		return res.status(400).json({ message: 'missing host' });
	}

	if (req.headers.host !== config.url) {
		console.log('[ap] host header was not present');
		return res
			.status(400)
			.json({ message: 'host doesnt match instance config' });
	} else {
		console.log('[ap] host header present');
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

	// fallback
	return res.status(400).send();
}

async function validateSignature(req, res) {}

module.exports = validateRequest;
