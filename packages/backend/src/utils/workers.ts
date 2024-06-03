import { Worker } from 'bullmq';

import logger from './logger.js';
import redis from './redis.js';

import acceptInboxRequest from './ap/acceptInboxRequest.js';
import postSigned from './ap/postSigned.js';

logger('info', 'core', 'starting workers');
const inboxWorker = new Worker(
	'inbox',
	async (job) => {
		return await acceptInboxRequest(await job.data.body);
	},
	{ connection: redis, concurrency: 100 }
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
	{ connection: redis, concurrency: 50 }
);

const statsWorker = new Worker(
	'stats',
	async (job) => {
		logger('debug', 'stats', 'stats update triggered');
		return;
	},
	{ connection: redis, concurrency: 1 }
);

export { inboxWorker };
export { deliverWorker };
export { statsWorker };
