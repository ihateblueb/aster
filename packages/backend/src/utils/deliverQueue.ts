import config from './config.js';
import redis from './redis.js';
import { Queue } from 'bullmq';

const deliverQueue = new Queue('deliver', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: true,
		attempts: config.deliver.attempts,
		backoff: {
			type: 'exponential',
			delay: config.deliver.backoff
		}
	}
});

export default deliverQueue;