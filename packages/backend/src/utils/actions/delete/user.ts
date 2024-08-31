import db from '../../database.js';
import logger from '../../logger.js';

export default async function deleteUser(id, apId) {
	let grabbedNotes = await db.getRepository('note').find({
		where: {
			author: id
		}
	});

	if (grabbedNotes) {
		grabbedNotes.forEach(async (e) => {
			await db.getRepository('note').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' + grabbedNotes.length + ' notes by ' + apId
		);
	}

	let grabbedLikes = await db.getRepository('note_like').find({
		where: {
			user: id
		}
	});

	if (grabbedLikes) {
		grabbedLikes.forEach(async (e) => {
			await db.getRepository('note_like').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' + grabbedLikes.length + ' likes by ' + apId
		);
	}

	let grabbedReactions = await db.getRepository('note_react').find({
		where: {
			user: id
		}
	});

	if (grabbedReactions) {
		grabbedReactions.forEach(async (e) => {
			await db.getRepository('note_react').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' + grabbedReactions.length + ' reactions by ' + apId
		);
	}

	let grabbedDriveFiles = await db.getRepository('drive_file').find({
		where: {
			user: id
		}
	});

	if (grabbedDriveFiles) {
		grabbedDriveFiles.forEach(async (e) => {
			await db.getRepository('drive_file').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' + grabbedDriveFiles.length + ' drive files by ' + apId
		);
	}

	let grabbedNotificationsFrom = await db
		.getRepository('user_notification')
		.find({
			where: {
				from: id
			}
		});

	if (grabbedNotificationsFrom) {
		grabbedNotificationsFrom.forEach(async (e) => {
			await db.getRepository('user_notification').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' +
				grabbedNotificationsFrom.length +
				' notifications from ' +
				apId
		);
	}

	let grabbedFollowrequestFrom = await db
		.getRepository('user_followrequest')
		.find({
			where: {
				from: id
			}
		});

	if (grabbedFollowrequestFrom) {
		grabbedFollowrequestFrom.forEach(async (e) => {
			await db.getRepository('user_followrequest').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' +
				grabbedFollowrequestFrom.length +
				' follow requests from ' +
				apId
		);
	}

	let grabbedRepeats = await db.getRepository('repeat').find({
		where: {
			author: id
		}
	});

	if (grabbedRepeats) {
		grabbedRepeats.forEach(async (e) => {
			await db.getRepository('repeat').delete(e.id);
		});
		logger.info(
			'delete',
			'deleted ' + grabbedRepeats.length + ' repeats from ' + apId
		);
	}

	await db.getRepository('user').delete(id);

	logger.info('delete', 'deleted actor ' + apId);
}
