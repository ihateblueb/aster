import express from 'express';
// import { Queue, Job } from 'bullmq';
import config from '../../utils/config.js';
import validateRequest from '../../utils/ap/validation.js';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest.js';
import logger from '../../utils/logger.js';

const router = express.Router();

/* const inboxQueue = new Queue('inbox', {
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
		removeOnFail: 10000
	}
}); */

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

	// yeah uuhjsdfd
	// await Job.create(inboxQueue);
});

export default router;
