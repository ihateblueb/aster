import db from '../../database.js';
import logger from '../../logger.js';

export default async function deleteNote(apId) {
	let grabbedNote = await db.getRepository('note').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedNote) {
		let grabbedReplies = await db.getRepository('note').find({
			where: {
				replying_to: grabbedNote.id
			}
		});

		if (grabbedReplies) {
			for (const e of grabbedReplies) {
				await db.getRepository('note').delete(e.id);
			}
		}

		logger.debug(
			'delete',
			'deleting ' +
				grabbedReplies.length +
				' replies to note ' +
				grabbedNote.ap_id
		);

		let grabbedRepeats = await db.getRepository('repeat').find({
			where: {
				note: grabbedNote.id
			}
		});

		if (grabbedRepeats) {
			for (const e of grabbedRepeats) {
				await db.getRepository('repeat').delete(e.id);
			}
		}

		logger.debug(
			'delete',
			'deleting ' +
				grabbedRepeats.length +
				' repeats of note ' +
				grabbedNote.ap_id
		);

		let grabbedNotificationsAbout = await db
			.getRepository('notification')
			.find({
				where: {
					object: grabbedNote.id
				}
			});

		if (grabbedNotificationsAbout) {
			for (const e of grabbedNotificationsAbout) {
				await db.getRepository('notification').delete(e.id);
			}
		}

		logger.debug(
			'delete',
			'deleting ' +
				grabbedRepeats.length +
				' notifications about note ' +
				grabbedNote.ap_id
		);

		await db.getRepository('note').delete(grabbedNote.id);

		logger.debug('delete', 'deleted note ' + grabbedNote.ap_id);
	}
}
