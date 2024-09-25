import db from '../../database.js';
import logger from '../../logger.js';

export default async function deleteUser(id, apId) {
	let grabbedNotes = await db.getRepository('note').find({
		where: {
			author: id
		}
	});

	if (grabbedNotes) {
		for (const e of grabbedNotes) {
			await db.getRepository('note').delete(e.id);
		}
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
		for (const e of grabbedLikes) {
			await db.getRepository('note_like').delete(e.id);
		}
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
		for (const e of grabbedReactions) {
			await db.getRepository('note_react').delete(e.id);
		}
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
		for (const e of grabbedDriveFiles) {
			await db.getRepository('drive_file').delete(e.id);
		}
		logger.info(
			'delete',
			'deleted ' + grabbedDriveFiles.length + ' drive files by ' + apId
		);
	}

	let grabbedNotificationsFrom = await db.getRepository('notification').find({
		where: {
			from: id
		}
	});

	if (grabbedNotificationsFrom) {
		for (const e of grabbedNotificationsFrom) {
			await db.getRepository('notification').delete(e.id);
		}
		logger.info(
			'delete',
			'deleted ' +
				grabbedNotificationsFrom.length +
				' notifications from ' +
				apId
		);
	}

	let grabbedRelationshipFrom = await db
		.getRepository('user_relationship')
		.find({
			where: {
				from: id
			}
		});

	if (grabbedRelationshipFrom) {
		for (const e of grabbedRelationshipFrom) {
			await db.getRepository('relationship').delete(e.id);
		}
		logger.info(
			'delete',
			'deleted ' +
				grabbedRelationshipFrom.length +
				' relationships from ' +
				apId
		);
	}

	let grabbedRelationshipTo = await db
		.getRepository('user_relationship')
		.find({
			where: {
				to: id
			}
		});

	if (grabbedRelationshipTo) {
		for (const e of grabbedRelationshipTo) {
			await db.getRepository('relationship').delete(e.id);
		}
		logger.info(
			'delete',
			'deleted ' +
				grabbedRelationshipTo.length +
				' relationships to ' +
				apId
		);
	}

	let grabbedRepeats = await db.getRepository('repeat').find({
		where: {
			author: id
		}
	});

	if (grabbedRepeats) {
		for (const e of grabbedRepeats) {
			await db.getRepository('repeat').delete(e.id);
		}
		logger.info(
			'delete',
			'deleted ' + grabbedRepeats.length + ' repeats from ' + apId
		);
	}

	await db.getRepository('user').delete(id);

	logger.info('delete', 'deleted actor ' + apId);
}
