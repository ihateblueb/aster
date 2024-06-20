import db from '../../database.js';
import deliverQueue from '../../deliverQueue.js';
import logger from '../../logger.js';

import buildApActivityCreate from '../../../constructors/ap/activities/create.js';

export default async function OutCreate(localUserId, type, object) {
	var grabbedUser = await db.getRepository('users').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser.local) {
		var createJson = await buildApActivityCreate(grabbedUser, type, object);

		grabbedUser.followers.forEach(async (e) => {
			let grabbedFollower = await db.getRepository('users').findOne({
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
				'sent deliver to ' +
					grabbedFollower.inbox +
					' from ' +
					grabbedUser.ap_id
			);
		});
	} else {
		logger(
			'error',
			'ap',
			'tried sending Create activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
