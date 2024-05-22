import db from '../database.js';
import logger from '../logger.js';

export default async function acceptInboxRequest(parsedBody) {
	logger('debug', 'ap', 'activity of type ' + parsedBody.type + ' received');
	if (parsedBody.type === 'Follow') {
		var grabbedLocalUserDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.object
			}
		});

		var grabbedLocalUser = grabbedLocalUserDb[0];

		if (!grabbedLocalUser) {
			logger('debug', 'ap', 'local user not here');
		}

		if (grabbedLocalUser.locked) {
			// wait for the user to accept
			return {
				status: '200',
				message: 'follow pending'
			};
		} else {
			// accept
			return {
				status: '200',
				message: 'follow accepted'
			};
		}
	} else if (parsedBody.type === 'Delete') {
		var grabbedRemoteActorDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.actor
			}
		});

		var grabbedRemoteActor = grabbedRemoteActorDb[0];

		if (grabbedRemoteActor) {
			await db.getRepository('users').delete(grabbedRemoteActor.id);
			logger('info', 'ap', 'deleted ' + parsedBody.actor);
			return {
				status: 200,
				message: 'actor deleted'
			};
		} else {
			logger(
				'debug',
				'ap',
				'accepted deletion of ' +
					parsedBody.actor +
					' even though it was not present'
			);
			return {
				status: 200,
				message: 'actor deleted'
			};
		}
	}
}
