import db from '../database';

export default async function acceptInboxRequest(parsedBody, res) {
	if (parsedBody.type === 'Follow') {
		console.log('[ap] follow request received!');

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
