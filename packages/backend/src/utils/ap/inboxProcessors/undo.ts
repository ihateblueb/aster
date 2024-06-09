import db from '../../database.js';
import logger from '../../logger.js';
import accept from '../../ap/accept.js';
import getRemoteActor from '../getRemoteActor.js';

export default async function IPUndo(body) {
	let grabbedLocalUser = await db.getRepository('users').findOne({
		where: {
			ap_id: body.object.object
		}
	});

	if (!grabbedLocalUser) {
		logger('debug', 'ap', 'local user not here');
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

	if (body.object.type === 'Follow') {
		await db
			.getRepository('users')
			.query(
				`UPDATE "users" SET "followers" = array_remove("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
			);

		accept(grabbedLocalUser.id, grabbedRemoteActor.inbox, body);

		return {
			status: 200,
			message: 'Undo follow accepted'
		};
	} else {
		return;
	}
}
