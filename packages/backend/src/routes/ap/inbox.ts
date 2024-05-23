import express from 'express';
import { Queue, QueueEvents, Job } from 'bullmq';

import config from '../../utils/config.js';
import logger from '../../utils/logger.js';

import workers from '../../utils/workers.js';
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
		attempts: 15,
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

	workers.inboxWorker.on('progress', async (job, progress) => {
		logger(
			'info',
			'inbox',
			`job ${job.id} says ${JSON.stringify(progress)}`
		);
	});

	workers.inboxWorker.on('completed', (job) => {
		logger('info', 'inbox', `job ${job.id} completed`);
	});

	workers.inboxWorker.on('failed', (job, failedReason) => {
		logger('error', 'inbox', `job ${job.id} failed. ${failedReason}`);
	});

	res.status(200).send();
});

export default router;
