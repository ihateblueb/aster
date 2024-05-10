import config from '../config';
import logger from '../logger';

export default async function signAndAccept(body, id, userId) {
	var acceptMessage = {
		'@context': 'https://www.w3.org/ns/activitystreams',
		id: `${config.url}accept/${id}`,
		type: 'Accept',
		actor: `${config.url}users/${userId}`,
		object: body
	};

	logger('debug', 'ap', 'acceptMessage');
}
