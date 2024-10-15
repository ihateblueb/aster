import { Worker } from 'bullmq';

import config from '../utils/config.js';
import redis from '../utils/redis.js';
import ApInboxService from './ap/ApInboxService.js';

const inbox = new Worker(
	'inbox',
	async (job) => {
		return await ApInboxService.process(await job.data.body);
	},
	{ connection: redis, concurrency: Number(config.inbox.concurrency) }
);

const deliver = new Worker(
	'deliver',
	async (job) => {
		return;
	},
	{ connection: redis, concurrency: Number(config.deliver.concurrency) }
);

class WorkerService {
	public inbox = inbox;
	public deliver = deliver;
}

export default new WorkerService();
