import deleteNote from '../utils/actions/delete/note.js';
import deleteUser from '../utils/actions/delete/user.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';

export default async function IDelete(body) {
	if (body.object.id) {
		let grabbedNote = await db.getRepository('note').findOne({
			where: {
				ap_id: body.object.id
			}
		});

		if (grabbedNote) {
			let grabbedAuthor = await db.getRepository('user').findOne({
				where: {
					id: grabbedNote.author
				}
			});

			if (grabbedAuthor) {
				if (grabbedAuthor.ap_id === body.actor) {
					await deleteNote(body.object.id);
				} else {
					logger.debug(
						'ap',
						'ignoring actor trying to delete a note not written by them'
					);
				}
			} else {
				logger.debug(
					'ap',
					'failed to fetch author of note being deleted, ignoring activity'
				);
			}
		} else {
			logger.debug(
				'ap',
				'failed to fetch note being deleted, ignoring activity'
			);
		}
	}

	if (body.actor === body.object) {
		let grabbedRemoteActor = await db.getRepository('user').findOne({
			where: {
				ap_id: body.actor
			}
		});

		if (grabbedRemoteActor) {
			await deleteUser(grabbedRemoteActor.id, body.actor);

			return {
				status: 200,
				message: 'Actor deleted'
			};
		} else {
			logger.debug(
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

	if (body.object) {
		let grabbedNote = await db.getRepository('note').findOne({
			where: {
				ap_id: body.object
			}
		});

		if (grabbedNote) {
			let grabbedAuthor = await db.getRepository('user').findOne({
				where: {
					id: grabbedNote.author
				}
			});

			if (grabbedAuthor) {
				if (grabbedAuthor.ap_id === body.actor) {
					await deleteNote(body.object);
				} else {
					logger.debug(
						'ap',
						'ignoring actor trying to delete a note not written by them'
					);
				}
			} else {
				logger.debug(
					'ap',
					'failed to fetch author of note being deleted, ignoring activity'
				);
			}
		} else {
			logger.debug(
				'ap',
				'failed to fetch note being deleted, ignoring activity'
			);
		}
	}

	return {
		status: 501,
		message: 'Not implemented'
	};
}
