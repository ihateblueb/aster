import config from '../config.js';
import deliverQueue from '../deliverQueue.js';
import Logger from '../logger.js';
import { v4 as uuidv4 } from 'uuid';

export default async function signAndReject(userId, remoteInbox, body) {
	const activityId = uuidv4();

	let rejectMessage = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${config.get().url}reject/${activityId}`,
		type: 'Reject',
		actor: `${config.get().url}users/${userId}`,
		object: body
	};

	Logger.debug('ap', JSON.stringify(rejectMessage));

	await deliverQueue.add('deliver', {
		inbox: remoteInbox,
		localUserId: userId,
		body: rejectMessage
	});
}
