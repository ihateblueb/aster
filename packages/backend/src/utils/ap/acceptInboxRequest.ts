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
			// this will have to add them to the pending follower array and wait to be moved
			return {
				status: '501',
				message: 'not implemented'
			};
		} else {
			// this will have to add them to the follower array, send an accept, and then it's good
			// followers should be stored at their AP ids to minimize sql queries later
			return {
				status: '501',
				message: 'not implemented'
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
				message: 'pretended to delete actor'
			};
		}
	}
}
