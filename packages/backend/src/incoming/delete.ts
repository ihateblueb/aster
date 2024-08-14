import db from '../utils/database.js';
import logger from '../utils/logger.js';

export default async function IDelete(body) {
	if (body.object.id) {
		logger('debug', 'ap', 'actor deleting a note?');
	}

	if (body.actor === body.object) {
		logger('debug', 'ap', 'actor deleting itself');

		let grabbedRemoteActor = await db.getRepository('user').findOne({
			where: {
				ap_id: body.actor
			}
		});

		if (grabbedRemoteActor) {
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
