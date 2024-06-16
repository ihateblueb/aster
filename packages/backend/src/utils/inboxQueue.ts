import config from './config.js';
import redis from './redis.js';
import { Queue } from 'bullmq';

const inboxQueue = new Queue('inbox', {
	connection: redis,
	defaultJobOptions: {
		removeOnComplete: true,
		attempts: config.inbox.attempts,
		backoff: {
			type: 'exponential',
			delay: config.inbox.backoff
		}
	}
});

export default inboxQueue;
