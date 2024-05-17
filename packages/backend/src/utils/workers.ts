import { Job, MetricsTime, Worker } from 'bullmq';

import config from './config.js';
import logger from './logger.js';

import inboxWorker from './processers/inboxWorker.js';

logger('info', 'redis', 'starting workers');

const iw = new Worker('inbox', (job: Job) => inboxWorker(job), {
	connection: {
		host: config.redishost,
		port: config.redisport,
		keyPrefix: config.redisprefix,
		db: config.redisdb,
		username: config.redisuser,
		password: config.redispw
	},
	concurrency: 50
});

export default { iw };
