import { Worker } from 'bullmq';

import redis from '../utils/redis.js';
import ApDeliverService from './ap/ApDeliverService.js';
import ApInboxService from './ap/ApInboxService.js';
import ConfigService from './ConfigService.js';

const inbox = new Worker(
	'{inbox}',
	async (job) => {
		return await ApInboxService.process(job.data);
	},
	{
		connection: redis,
		prefix: ConfigService.redis.prefix + ':queue',
		concurrency: ConfigService.queue.inbox.concurrency
	}
);

const deliver = new Worker(
	'{deliver}',
	async (job) => {
		return await ApDeliverService.deliver(job.data);
	},
	{
		connection: redis,
		prefix: ConfigService.redis.prefix + ':queue',
		concurrency: ConfigService.queue.deliver.concurrency
	}
);

const backfill = new Worker(
	'{backfill}',
	async (job) => {
		throw new Error('processing not implemented');
	},
	{
		connection: redis,
		prefix: ConfigService.redis.prefix + ':queue',
		concurrency: ConfigService.queue.backfill.concurrency
	}
);

class WorkerService {
	public inbox = inbox;
	public deliver = deliver;
	public backfill = backfill;
}

export default new WorkerService();
