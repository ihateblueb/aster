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
	{ connection: redis }
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
	{ connection: redis }
);

export { inboxWorker };
export { deliverWorker };
