import config from './config.js';
import redis from './redis.js';
import { Queue } from 'bullmq';

const inboxQueue = new Queue('inbox', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: false,
		removeOnFail: false,
		attempts: config.get().inbox.attempts,
		backoff: {
			type: 'exponential',
			delay: config.get().inbox.backoff
		}
	}
});

export default inboxQueue;
