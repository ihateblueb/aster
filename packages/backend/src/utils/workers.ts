import { Worker } from 'bullmq';

import config from './config.js';
import logger from './logger.js';
import acceptInboxRequest from './ap/acceptInboxRequest.js';

const redisConnection = {
	host: config.redishost,
	port: config.redisport,
	keyPrefix: config.redisprefix,
	db: config.redisdb,
	username: config.redisuser,
	password: config.redispw
};

logger('info', 'core', 'starting workers');
const inboxWorker = new Worker(
	'inbox',
	async (job) => {
		return await acceptInboxRequest(await job.data.body);
	},
	{ connection: redisConnection }
);

export default { inboxWorker };
