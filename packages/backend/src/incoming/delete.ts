import deleteNote from '../utils/actions/delete/note.js';
import deleteUser from '../utils/actions/delete/user.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';

export default async function IDelete(body) {
	if (body.object.id) {
		await deleteNote(body.object.id, body.actor);
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
