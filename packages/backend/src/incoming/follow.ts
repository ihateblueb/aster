import signAndAccept from '../utils/ap/accept.js';
import createNotification from '../utils/createNotification.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';
import getRemoteActor from '../utils/ap/getRemoteActor.js';
import { v4 as uuidv4 } from 'uuid';

export default async function IFollow(body) {
	let grabbedLocalUser = await db.getRepository('user').findOne({
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
			.getRepository('user_followrequest')
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
			.getRepository('user')
			.query(
				`UPDATE "user" SET "followers" = array_append("followers", '${grabbedRemoteActor.ap_id}') WHERE "id" = '${grabbedLocalUser.id}'`
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
