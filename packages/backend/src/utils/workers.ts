import acceptInboxRequest from './ap/acceptInboxRequest.js';
import postSigned from './ap/postSigned.js';
import logger from './logger.js';
import redis from './redis.js';
import { Worker } from 'bullmq';

const inboxWorker = new Worker(
	'inbox',
	async (job) => {
		return await acceptInboxRequest(await job.data.body);
	},
	{ connection: redis, concurrency: 25 }
);

const deliverWorker = new Worker(
	'deliver',
	async (job) => {
		return await postSigned(
			await job.data.inbox,
			await job.data.localUserId,
			await job.data.body
		);
	},
	{ connection: redis, concurrency: 25 }
);

const statsWorker = new Worker(
	'stats',
	async (job) => {
		logger.debug('stats', 'stats update triggered');
		return;
	},
	{ connection: redis, concurrency: 25 }
);

export { deliverWorker, inboxWorker, statsWorker };
