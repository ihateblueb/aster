import express from 'express';
import { Queue } from 'bullmq';

import logger from '../../utils/logger.js';
import validateRequest from '../../utils/ap/validation.js';
import redis from '../../utils/redis.js';

const router = express.Router();

const inboxQueue = new Queue('inbox', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: true,
		attempts: 5,
		backoff: {
			type: 'exponential',
			delay: 5000
		}
	}
});

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	logger('debug', 'ap', JSON.stringify(JSON.parse(req.body)));

	// this will return before the following can run if it's invalid
	validateRequest(req, res);

	await inboxQueue.add(
		'inbox',
		{
			body: JSON.parse(req.body)
		},
		{ jobId: JSON.parse(req.body).id }
	);

	res.status(200).send();
});

export default router;
