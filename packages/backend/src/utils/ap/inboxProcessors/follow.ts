import db from '../../database.js';
import logger from '../../logger.js';
import accept from '../../ap/accept.js';
import getRemoteActor from '../getRemoteActor.js';

export default async function IPFollow(body) {
	let grabbedLocalUser = await db.getRepository('users').findOne({
		where: {
			ap_id: body.object
		}
	});

	if (!grabbedLocalUser) {
		logger('debug', 'ap', 'local user not here');
	}

	if (!grabbedLocalUser.local) {
		return {
			status: '400',
			message: 'User is not local'
		};
	}

	let grabbedRemoteActor = await getRemoteActor(body.actor);

	if (grabbedLocalUser.locked) {
		await db
			.getRepository('users')
			.query(
				`UPDATE "users" SET "pending_followers" = array_append("pending_followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
			);
		return {
			status: 200,
			message: 'Added pending follower'
		};
	} else {
		await db
			.getRepository('users')
			.query(
				`UPDATE "users" SET "followers" = array_append("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
			);

		accept(grabbedLocalUser.id, grabbedRemoteActor.inbox, body);
	}
}
