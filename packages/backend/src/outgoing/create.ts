import { v4 as uuidv4 } from 'uuid';
import ActCreate from '../constructors/activity/Create.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import logger from '../utils/logger.js';

export default async function OCreate(localUserId, object) {
	var grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser.local) {
		console.log(object);
		var createJson = new ActCreate({
			id: uuidv4(),
			actor: grabbedUser,
			object: object
		});

		if (grabbedUser.followers) {
			grabbedUser.followers.forEach(async (e) => {
				let grabbedFollower = await db.getRepository('user').findOne({
					where: {
						ap_id: e
					}
				});
				await deliverQueue.add('deliver', {
					inbox: grabbedFollower.inbox,
					localUserId: grabbedUser.id,
					body: createJson
				});
				logger(
					'debug',
					'ap',
					'queued deliver to ' +
						grabbedFollower.inbox +
						' from ' +
						grabbedUser.ap_id
				);
			});
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
