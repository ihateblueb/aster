import { v4 as uuidv4 } from 'uuid';
import db from '../utils/database.js';
import deliverQueue from '../utils/deliverQueue.js';
import Logger from '../utils/logger.js';
import ActAnnounce from '../constructors/activity/Announce.js';

export default async function OAnnounce(localUserId, repeat) {
	let grabbedUser = await db.getRepository('user').findOne({
		where: {
			id: localUserId
		}
	});

	let grabbedRepeatedNote = await db.getRepository('note').findOne({
		where: {
			id: repeat.note
		}
	});

	if (grabbedUser.local) {
		let announceJson = new ActAnnounce({
			id: uuidv4(),
			actor: grabbedUser,
			object: grabbedRepeatedNote.ap_id,
			visibility: repeat.visibility
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
						body: announceJson
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
			'tried sending Announce activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
