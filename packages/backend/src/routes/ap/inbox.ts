import express from 'express';
import { Queue, QueueEvents, Job } from 'bullmq';

import config from '../../utils/config.js';
import logger from '../../utils/logger.js';

import workers from '../../utils/workers.js';
import validateRequest from '../../utils/ap/validation.js';

const router = express.Router();

if (!config.redishost) {
	logger('fatal', 'core', 'no redis host configured');
}
if (!config.redisport) {
	logger('fatal', 'core', 'no redis port configured');
}

const redisConnection = {
	host: config.redishost,
	port: config.redisport
};

if (config.redisprefix) {
	redisConnection['keyPrefix'] = config.redisprefix;
}
if (config.redisdb) {
	redisConnection['db'] = config.redisdb;
}
if (config.redisuser) {
	redisConnection['username'] = config.redisuser;
}
if (config.redispass) {
	redisConnection['password'] = config.redispass;
}

const inboxQueue = new Queue('inbox', {
	connection: redisConnection,
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
		if (job.id === JSON.parse(req.body).id) {
			logger(
				'info',
				'inbox',
				`job ${job.id} completed. ${JSON.stringify(job.returnvalue)}`
			);
		}
	});

	workers.inboxWorker.on('failed', (job, failedReason) => {
		logger('error', 'inbox', `job ${job.id} failed. ${failedReason}`);
	});

	res.status(200).send();
});

export default router;
