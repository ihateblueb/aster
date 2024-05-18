import express from 'express';
import validateRequest from '../../utils/ap/validation.js';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest.js';
import logger from '../../utils/logger.js';

const router = express.Router();

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	let jobData = {
		req,
		res
	};

	logger('debug', 'ap', JSON.parse(req.body));

	validateRequest(req, res);

	acceptInboxRequest(JSON.parse(req.body), res);
});

export default router;
