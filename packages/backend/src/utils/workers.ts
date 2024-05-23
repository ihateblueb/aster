import { Worker } from 'bullmq';

import config from './config.js';
import logger from './logger.js';
import acceptInboxRequest from './ap/acceptInboxRequest.js';

logger('info', 'bull', 'starting workers');
const inboxWorker = new Worker(
	'inbox',
	async (job) => {
		await job.updateProgress({
			message: 'inbox worker called'
		});
		/*
		await job.updateProgress({
			message: `we were passed ${JSON.stringify(await job.data.body)}`
		});
		*/
		return await acceptInboxRequest(await job.data.body);
	},
	{
		connection: {
			host: config.redishost,
			port: config.redisport,
			keyPrefix: config.redisprefix,
			db: config.redisdb,
			username: config.redisuser,
			password: config.redispw
		}
	}
);

export default { inboxWorker };
