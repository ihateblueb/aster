import { v4 as uuidv4 } from 'uuid';
import ActFollow from '../constructors/activity/Follow.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import Logger from '../utils/logger.js';

export default async function OFollow(localUserId, object) {
	let grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser.local) {
		console.log(object);
		let followJson = new ActFollow({
			id: uuidv4(),
			actor: grabbedUser,
			object: object
		});

		let grabbedFollowing = await db.getRepository('user').findOne({
			where: {
				ap_id: object
			}
		});

		if (!grabbedFollowing.local) {
			await deliverQueue.add('deliver', {
				inbox: grabbedFollowing.inbox,
				localUserId: grabbedUser.id,
				body: followJson
			});

			Logger.debug(
				'ap',
				'queued deliver to ' +
					grabbedFollowing.inbox +
					' from ' +
					grabbedUser.ap_id
			);
		}
	} else {
		Logger.error(
			'ap',
			'tried sending Create activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
