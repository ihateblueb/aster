import signAndAccept from '../../ap/accept.js';
import createNotification from '../../createNotification.js';
import db from '../../database.js';
import logger from '../../logger.js';
import getRemoteActor from '../getRemoteActor.js';
import { v4 as uuidv4 } from 'uuid';

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
		const followrequestId = uuidv4();

		let followrequestToInsert = {};

		followrequestToInsert['id'] = followrequestId;
		followrequestToInsert['to'] = grabbedLocalUser.id;
		followrequestToInsert['from'] = grabbedRemoteActor.id;
		followrequestToInsert['time'] = new Date(Date.now()).toISOString();
		followrequestToInsert['object'] = JSON.stringify(body);

		await db
			.getRepository('users_followrequest')
			.insert(followrequestToInsert);

		await createNotification(
			grabbedLocalUser.id,
			grabbedRemoteActor.id,
			'followrequest',
			followrequestId
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

		await createNotification(
			grabbedLocalUser.id,
			grabbedRemoteActor.id,
			'follow'
		);

		await signAndAccept(
			grabbedLocalUser.id,
			grabbedRemoteActor.inbox,
			body
		);
	}
}
