import db from '../../database.js';
import logger from '../../logger.js';

export default async function deleteNote(apId, actorApId) {
	let grabbedNote = await db.getRepository('note').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedNote) {
		let grabbedAuthor = await db.getRepository('user').findOne({
			where: {
				id: grabbedNote.author
			}
		});

		if (grabbedAuthor) {
			if (grabbedAuthor.ap_id === actorApId) {
				let grabbedReplies = await db.getRepository('note').find({
					where: {
						replying_to: grabbedNote.id
					}
				});

				if (grabbedReplies) {
					await grabbedReplies.forEach(async (e) => {
						await db.getRepository('note').delete(e.id);
					});
				}

				logger(
					'debug',
					'ap',
					'deleting all replies to note ' + grabbedNote.ap_id
				);

				await db.getRepository('note').delete(grabbedNote.id);

				logger('debug', 'ap', 'deleted note ' + grabbedNote.ap_id);
			} else {
				logger(
					'debug',
					'ap',
					'ignoring actor trying to delete a note not written by them'
				);
			}
		} else {
			logger(
				'debug',
				'ap',
				'failed to fetch author of note being deleted, ignoring activity'
			);
		}
	} else {
		logger(
			'debug',
			'ap',
			'failed to fetch note being deleted, ignoring activity'
		);
	}
}
