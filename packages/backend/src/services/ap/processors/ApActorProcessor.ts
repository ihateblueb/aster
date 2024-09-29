import { v4 as uuidv4 } from 'uuid';
import logger from '../../../utils/logger.js';
import db from '../../../utils/database.js';

class ApActorProcessor {
	public async new(actor) {
		const userId = uuidv4();

		let userToInsert = {};

		userToInsert = {
			id: userId
		};

		await db.getRepository('user').insert(userToInsert);

		logger.info('ap', 'created remote actor ' + actor.id);

		console.log(userToInsert);

		return userToInsert;
	}
}

export default new ApActorProcessor();
