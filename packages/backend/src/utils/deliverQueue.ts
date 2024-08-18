import config from './config.js';
import redis from './redis.js';
import { Queue } from 'bullmq';

const deliverQueue = new Queue('deliver', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: config.get().deliver.attempts,
		backoff: {
			type: 'exponential',
			delay: config.get().deliver.backoff
		}
	}
});

export default deliverQueue;
