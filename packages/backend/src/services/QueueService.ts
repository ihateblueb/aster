import { Queue } from 'bullmq';

import config from '../utils/config.js';
import redis from '../utils/redis.js';

const inbox = new Queue('{inbox}', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: config.inbox.attempts,
		backoff: {
			type: 'exponential',
			delay: config.inbox.backoff
		}
	}
});

const deliver = new Queue('{deliver}', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: config.deliver.attempts,
		backoff: {
			type: 'exponential',
			delay: config.deliver.backoff
		}
	}
});

const backfill = new Queue('{backfill}', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: config.backfill.attempts,
		backoff: {
			type: 'exponential',
			delay: config.backfill.backoff
		}
	}
});

class QueueService {
	public inbox = inbox;
	public deliver = deliver;
	public backfill = backfill;
}

export default new QueueService();
