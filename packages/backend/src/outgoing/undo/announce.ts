import db from '../../utils/database.js';
import deliverQueue from '../../utils/deliverQueue.js';
import logger from '../../utils/logger.js';
import ActAnnounce from '../../constructors/activity/Announce.js';
import ActUndo from '../../constructors/activity/Undo.js';

export default async function OUndoAnnounce(localUserId, repeat) {
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
		let announceJson = new ActUndo(
			new ActAnnounce({
				id: repeat.id,
				actor: grabbedUser,
				object: grabbedRepeatedNote.ap_id,
				visibility: repeat.visibility
			})
		);

		let grabbedFollowers = await db.getRepository('relationship').find({
			where: {
				to: grabbedUser.id
			}
		});

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
							body: announceJson
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
			'tried sending Announce activity for non-local user ' +
				grabbedUser.ap_id
		);
	}
}
