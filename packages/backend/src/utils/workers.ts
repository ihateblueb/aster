import { Job, MetricsTime, Worker } from 'bullmq';

import config from './config';
import logger from './logger';

import inboxWorker from './processers/inboxWorker';

logger('info', 'redis', 'starting workers');

const inboxw = new Worker('inbox', (job: Job) => inboxWorker(job), {
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

export default { inboxw };
