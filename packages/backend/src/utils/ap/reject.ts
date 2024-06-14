import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';

import config from '../config.js';
import logger from '../logger.js';
import redis from '../redis.js';

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

export default async function signAndReject(userId, remoteInbox, body) {
	const activityId = uuidv4();

	var rejectMessage = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${config.url}reject/${activityId}`,
		type: 'Reject',
		actor: `${config.url}users/${userId}`,
		object: body
	};

	logger('debug', 'ap', JSON.stringify(rejectMessage));

	await deliverQueue.add('deliver', {
		inbox: remoteInbox,
		localUserId: userId,
		body: rejectMessage
	});
}
