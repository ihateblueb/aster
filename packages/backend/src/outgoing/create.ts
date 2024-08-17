import { v4 as uuidv4 } from 'uuid';
import ActCreate from '../constructors/activity/Create.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import Logger from '../utils/logger.js';

export default async function OCreate(localUserId, object) {
	let grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser.local) {
		console.log(object);
		let createJson = new ActCreate({
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

				if (!grabbedFollower.local) {
					await deliverQueue.add('deliver', {
						inbox: grabbedFollower.inbox,
						localUserId: grabbedUser.id,
						body: createJson
					});

					Logger.debug(
						'ap',
						'queued deliver to ' +
							grabbedFollower.inbox +
							' from ' +
							grabbedUser.ap_id
					);
				}
			});
		}
	} else {
		Logger.error(
			'ap',
			'tried sending Create activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
