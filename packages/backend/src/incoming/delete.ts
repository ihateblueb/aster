import db from '../utils/database.js';
import logger from '../utils/logger.js';

export default async function IDelete(body) {
	if (body.object.id) {
		logger('debug', 'ap', 'actor deleting a note?');
	}

	if (body.actor === body.object) {
		let grabbedRemoteActor = await db.getRepository('user').findOne({
			where: {
				ap_id: body.actor
			}
		});

		if (grabbedRemoteActor) {
			let grabbedNotes = await db.getRepository('note').find({
				where: {
					author: grabbedRemoteActor.id
				}
			});

			if (grabbedNotes) {
				grabbedNotes.forEach(async (e) => {
					await db.getRepository('note').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' + grabbedNotes.length + ' notes by ' + body.actor
				);
			}

			let grabbedLikes = await db.getRepository('note_like').find({
				where: {
					user: grabbedRemoteActor.id
				}
			});

			if (grabbedLikes) {
				grabbedLikes.forEach(async (e) => {
					await db.getRepository('note_like').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' + grabbedLikes.length + ' likes by ' + body.actor
				);
			}

			let grabbedReactions = await db.getRepository('note_react').find({
				where: {
					user: grabbedRemoteActor.id
				}
			});

			if (grabbedReactions) {
				grabbedReactions.forEach(async (e) => {
					await db.getRepository('note_react').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' +
						grabbedReactions.length +
						' reactions by ' +
						body.actor
				);
			}

			let grabbedDriveFiles = await db.getRepository('drive_file').find({
				where: {
					user: grabbedRemoteActor.id
				}
			});

			if (grabbedDriveFiles) {
				grabbedDriveFiles.forEach(async (e) => {
					await db.getRepository('drive_file').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' +
						grabbedDriveFiles.length +
						' drive files by ' +
						body.actor
				);
			}

			let grabbedNotificationsFrom = await db
				.getRepository('user_notification')
				.find({
					where: {
						from: grabbedRemoteActor.id
					}
				});

			if (grabbedNotificationsFrom) {
				grabbedNotificationsFrom.forEach(async (e) => {
					await db.getRepository('user_notification').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' +
						grabbedNotificationsFrom.length +
						' notifications from ' +
						body.actor
				);
			}

			let grabbedFollowrequestFrom = await db
				.getRepository('user_followrequest')
				.find({
					where: {
						from: grabbedRemoteActor.id
					}
				});

			if (grabbedFollowrequestFrom) {
				grabbedFollowrequestFrom.forEach(async (e) => {
					await db.getRepository('user_followrequest').delete(e.id);
				});
				logger(
					'info',
					'ap',
					'deleted ' +
						grabbedFollowrequestFrom.length +
						' follow requests from ' +
						body.actor
				);
			}

			await db.getRepository('user').delete(grabbedRemoteActor.id);
			logger('info', 'ap', 'deleted actor ' + body.actor);

			return {
				status: 200,
				message: 'Actor deleted'
			};
		} else {
			logger(
				'debug',
				'ap',
				'accepted deletion of actor ' +
					body.actor +
					' even though it was not present'
			);
			return {
				status: 200,
				message: 'Pretended to delete actor'
			};
		}
	}

	return {
		status: 501,
		message: 'Not implemented'
	};
}
