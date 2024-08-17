import { v4 as uuidv4 } from 'uuid';
import ActCreate from '../constructors/activity/Create.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import Logger from '../utils/logger.js';
import ActLike from '../constructors/activity/Like.js';

export default async function OLike(
	likeId,
	localUserId,
	author,
	note,
	reaction?
) {
	let grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	if (grabbedUser) {
		if (grabbedUser.local) {
			let likeJson = new ActLike(
				likeId,
				grabbedUser,
				author,
				note,
				reaction
			);

			if (grabbedUser.followers) {
				await deliverQueue.add('deliver', {
					inbox: author.inbox,
					localUserId: grabbedUser.id,
					body: likeJson
				});
				Logger.debug(
					'ap',
					'queued deliver to ' +
						author.inbox +
						' from ' +
						grabbedUser.ap_id
				);

				grabbedUser.followers.forEach(async (e) => {
					let grabbedFollower = await db
						.getRepository('user')
						.findOne({
							where: {
								ap_id: e
							}
						});

					if (!grabbedFollower.local) {
						await deliverQueue.add('deliver', {
							inbox: grabbedFollower.inbox,
							localUserId: grabbedUser.id,
							body: likeJson
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
	} else {
		Logger.error(
			'ap',
			'tried sending Create activity for non-existant ' + grabbedUser
		);
	}
}
