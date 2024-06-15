import { v4 as uuidv4 } from 'uuid';

import config from '../config.js';
import logger from '../logger.js';
import deliverQueue from '../deliverQueue.js';

export default async function signAndAccept(userId, remoteInbox, body) {
	const activityId = uuidv4();

	var acceptMessage = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${config.url}accept/${activityId}`,
		type: 'Accept',
		actor: `${config.url}users/${userId}`,
		object: body
	};

	logger('debug', 'ap', JSON.stringify(acceptMessage));

	await deliverQueue.add('deliver', {
		inbox: remoteInbox,
		localUserId: userId,
		body: acceptMessage
	});
}
