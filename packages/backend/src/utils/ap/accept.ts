import config from '../config.js';
import deliverQueue from '../deliverQueue.js';
import logger from '../logger.js';
import { v4 as uuidv4 } from 'uuid';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default async function signAndAccept(userId, remoteInbox, body) {
	const activityId = uuidv4();

	var acceptMessage = {
		'@context': ['https://www.w3.org/ns/activitystreams', contexts],
		id: `${config.url}accept/${activityId}`,
		type: 'Accept',
		actor: `${config.url}users/${userId}`,
		object: body
	};

	logger('debug', 'ap', JSON.stringify(acceptMessage));
	logger('debug', 'ap', ' they call me The Sillier ');

	await deliverQueue.add('deliver', {
		inbox: remoteInbox,
		localUserId: userId,
		body: acceptMessage
	});
}
