import { Queue } from 'bullmq';

import redis from '../utils/redis.js';
import ConfigService from './ConfigService.js';

const inbox = new Queue('{inbox}', {
	connection: redis,
	prefix: ConfigService.redis.prefix + ':queue',
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: ConfigService.queue.inbox.attempts,
		backoff: {
			type: 'exponential',
			delay: ConfigService.queue.inbox.backoff
		}
	}
});

const deliver = new Queue('{deliver}', {
	connection: redis,
	prefix: ConfigService.redis.prefix + ':queue',
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: ConfigService.queue.deliver.attempts,
		backoff: {
			type: 'exponential',
			delay: ConfigService.queue.deliver.backoff
		}
	}
});

const backfill = new Queue('{backfill}', {
	connection: redis,
	prefix: ConfigService.redis.prefix + ':queue',
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: ConfigService.queue.backfill.attempts,
		backoff: {
			type: 'exponential',
			delay: ConfigService.queue.backfill.backoff
		}
	}
});

class QueueService {
	public inbox = inbox;
	public deliver = deliver;
	public backfill = backfill;
}

export default new QueueService();
