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
			await grabbedReplies.forEach(async (e) => {
				await db.getRepository('note').delete(e.id);
			});
		}

		logger(
			'debug',
			'util',
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
			await grabbedRepeats.forEach(async (e) => {
				await db.getRepository('repeat').delete(e.id);
			});
		}

		logger(
			'debug',
			'util',
			'deleting ' +
				grabbedRepeats.length +
				' repeats of note ' +
				grabbedNote.ap_id
		);

		let grabbedNotificationsAbout = await db
			.getRepository('user_notification')
			.find({
				where: {
					object: grabbedNote.id
				}
			});

		if (grabbedNotificationsAbout) {
			await grabbedNotificationsAbout.forEach(async (e) => {
				await db.getRepository('user_notification').delete(e.id);
			});
		}

		logger(
			'debug',
			'util',
			'deleting ' +
				grabbedRepeats.length +
				' notifications about note ' +
				grabbedNote.ap_id
		);

		await db.getRepository('note').delete(grabbedNote.id);

		logger('debug', 'util', 'deleted note ' + grabbedNote.ap_id);
	}
}
