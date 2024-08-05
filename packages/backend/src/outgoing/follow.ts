import { v4 as uuidv4 } from 'uuid';
import ActFollow from '../constructors/activity/Follow.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import logger from '../utils/logger.js';

export default async function OFollow(localUserId, object) {
	var grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser.local) {
		console.log(object);
		var followJson = new ActFollow({
			id: uuidv4(),
			actor: grabbedUser,
			object: object
		});

		var grabbedFollowing = await db.getRepository('user').findOne({
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

			logger(
				'debug',
				'ap',
				'queued deliver to ' +
					grabbedFollowing.inbox +
					' from ' +
					grabbedUser.ap_id
			);
		}
	} else {
		logger(
			'error',
			'ap',
			'tried sending Create activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
