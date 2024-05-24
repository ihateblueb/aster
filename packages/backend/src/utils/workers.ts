import { Worker } from 'bullmq';

import config from './config.js';
import logger from './logger.js';
import acceptInboxRequest from './ap/acceptInboxRequest.js';

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

logger('info', 'core', 'starting workers');
const inboxWorker = new Worker(
	'inbox',
	async (job) => {
		return await acceptInboxRequest(await job.data.body);
	},
	{ connection: redisConnection }
);

export default { inboxWorker };
