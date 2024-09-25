import { v4 as uuidv4 } from 'uuid';
import ActCreate from '../constructors/activity/Create.js';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import logger from '../utils/logger.js';

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

		let grabbedFollowers = await db.getRepository('relationship').find({
			where: {
				to: grabbedUser.id
			}
		});

		if (object.inReplyTo) {
			console.log(object.inReplyTo);

			let grabbedRemoteReplyAuthor = await db
				.getRepository('user')
				.findOne({
					where: {
						ap_id: object.inReplyTo
					}
				});

			if (grabbedRemoteReplyAuthor) {
				await deliverQueue.add('deliver', {
					inbox: grabbedRemoteReplyAuthor.inbox,
					localUserId: grabbedUser.id,
					body: createJson
				});

				logger.debug(
					'ap',
					'queued deliver to ' +
						grabbedRemoteReplyAuthor.inbox +
						' from ' +
						grabbedUser.ap_id
				);
			}
		}

		if (grabbedFollowers) {
			grabbedFollowers.forEach(async (e) => {
				let grabbedFollower = await db.getRepository('user').findOne({
					where: {
						id: e.from
					}
				});

				console.log(grabbedFollower);

				if (grabbedFollower) {
					if (!grabbedFollower.local) {
						await deliverQueue.add('deliver', {
							inbox: grabbedFollower.inbox,
							localUserId: grabbedUser.id,
							body: createJson
						});

						logger.debug(
							'ap',
							'queued deliver to ' +
								grabbedFollower.inbox +
								' from ' +
								grabbedUser.ap_id
						);
					}
				}
			});
		}
	} else {
		logger.error(
			'ap',
			'tried sending Create activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
