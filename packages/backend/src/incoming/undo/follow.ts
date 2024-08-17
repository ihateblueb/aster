import signAndAccept from '../../utils/ap/accept.js';
import db from '../../utils/database.js';
import Logger from '../../utils/logger.js';
import getRemoteActor from '../../utils/ap/getRemoteActor.js';

export default async function IUndoFollow(body) {
	let grabbedLocalUser = await db.getRepository('user').findOne({
		where: {
			ap_id: body.object.object
		}
	});

	if (!grabbedLocalUser) {
		Logger.debug('ap', 'local user not here');
		return {
			status: '400',
			message: 'User is not here'
		};
	}

	if (!grabbedLocalUser.local) {
		return {
			status: '400',
			message: 'User is not local'
		};
	}

	let grabbedRemoteActor = await getRemoteActor(body.actor);

	await db
		.getRepository('user')
		.query(
			`UPDATE "user" SET "followers" = array_remove("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
		);

	await signAndAccept(grabbedLocalUser.id, grabbedRemoteActor.inbox, body);

	return {
		status: 200,
		message: 'Undo follow accepted'
	};
}
