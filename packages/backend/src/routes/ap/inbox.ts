import express from 'express';
import { Queue, QueueEvents, Job } from 'bullmq';

import config from '../../utils/config.js';
import logger from '../../utils/logger.js';
import validateRequest from '../../utils/ap/validation.js';

const router = express.Router();

const inboxQueue = new Queue('inbox', {
	connection: {
		host: config.redishost,
		port: config.redisport,
		keyPrefix: config.redisprefix,
		db: config.redisdb,
		username: config.redisuser,
		password: config.redispw
	},
	defaultJobOptions: {
		removeOnComplete: true,
		attempts: 5,
		backoff: {
			type: 'exponential',
			delay: 1000
		},
		removeOnFail: 15000
	}
});

const inboxQueueEvents = new QueueEvents('inbox');

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
			body: req.body
		},
		{ jobId: req.body.id }
	);

	inboxQueueEvents.on('completed', ({ jobId }) => {
		console.log('done painting');
	});

	inboxQueueEvents.on('waiting', ({ jobId }) => {
		console.log('waiting');
	});

	inboxQueueEvents.on(
		'failed',
		({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
			console.error('error painting', failedReason);
		}
	);

	res.status(200).send();
});

export default router;
