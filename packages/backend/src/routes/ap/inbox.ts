import express from 'express';
const router = express.Router();

import validateRequest from '../../utils/ap/validation.js';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest.js';
import logger from '../../utils/logger.js';

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	logger('debug', 'ap', JSON.parse(req.body));

	validateRequest(req, res);

	// if it has passed the 40 validation checks, you can now trust it!

	acceptInboxRequest(JSON.parse(req.body), res);
});

export default router;
