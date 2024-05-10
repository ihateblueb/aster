import db from '../database';
import logger from '../logger';

export default async function acceptInboxRequest(parsedBody, res) {
	logger('debug', 'ap', 'activity of type ' + parsedBody.type + ' received');
	if (parsedBody.type === 'Follow') {
		var grabbedLocalUserDb = await db.getRepository('users').find({
			where: {
				ap_id: parsedBody.object
			}
		});

		var grabbedLocalUser = grabbedLocalUserDb[0];

		if (!grabbedLocalUser) {
			console.log('local user not here!');
		}

		if (grabbedLocalUser.locked) {
			// do NOT !!
		} else {
			// accept
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
			console.log('[ap] deleted ' + parsedBody.actor);
			return res.status(200).send();
		} else {
			console.log(
				'[ap] accepted deletion of ' +
					parsedBody.actor +
					' even though it wasnt present'
			);
			return res.status(200).send();
		}
	}
}
