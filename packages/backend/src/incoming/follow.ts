import signAndAccept from '../utils/ap/accept.js';
import db from '../utils/database.js';
import Logger from '../utils/logger.js';
import getRemoteActor from '../utils/ap/getRemoteActor.js';
import { v4 as uuidv4 } from 'uuid';
import notification from '../utils/notification.js';

export default async function IFollow(body) {
	let grabbedLocalUser = await db.getRepository('user').findOne({
		where: {
			ap_id: body.object
		}
	});

	if (!grabbedLocalUser) {
		Logger.debug('ap', 'local user not here');
	}

	if (!grabbedLocalUser.local) {
		return {
			status: '400',
			message: 'User is not local'
		};
	}

	let grabbedRemoteActor = await getRemoteActor(body.actor);

	if (grabbedLocalUser.locked) {
		const relationshipId = uuidv4();

		let relationshipToInsert = {};

		relationshipToInsert['id'] = relationshipId;
		relationshipToInsert['to'] = grabbedLocalUser.id;
		relationshipToInsert['from'] = grabbedRemoteActor.id;
		relationshipToInsert['created_at'] = new Date(Date.now()).toISOString();
		relationshipToInsert['pending'] = true;
		relationshipToInsert['object'] = body;

		await db.getRepository('relationship').insert(relationshipToInsert);

		await notification.create(
			grabbedLocalUser.id,
			grabbedRemoteActor.id,
			'followrequest',
			relationshipId
		);

		return {
			status: 200,
			message: 'Added pending follower'
		};
	} else {
		const relationshipId = uuidv4();

		let relationshipToInsert = {};

		relationshipToInsert['id'] = relationshipId;
		relationshipToInsert['to'] = grabbedLocalUser.id;
		relationshipToInsert['from'] = grabbedRemoteActor.id;
		relationshipToInsert['created_at'] = new Date(Date.now()).toISOString();

		await db.getRepository('relationship').insert(relationshipToInsert);

		await notification.create(
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
