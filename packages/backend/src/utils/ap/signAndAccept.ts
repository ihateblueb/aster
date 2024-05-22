import config from '../config.js';
import logger from '../logger.js';

export default async function signAndAccept(activityId, userId, body) {
	var acceptMessage = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${config.url}accept/${activityId}`,
		type: 'Accept',
		actor: `${config.url}users/${userId}`,
		object: body
	};

	logger('debug', 'ap', 'acceptMessage');

	return acceptMessage;
}
