import logger from '../../utils/logger.js';
import db from '../../utils/database.js';
import ApResolverService from './ApResolverService.js';

class ApActorService {
	public async get(apId: string) {
		logger.debug('ap', 'getting actor by id ' + apId);

		let actor = await db.getRepository('user').findOne({
			where: { ap_id: apId }
		});

		if (actor) {
			logger.debug('ap', 'actor ' + apId + ' found in database');
			return actor;
		} else {
			logger.debug(
				'ap',
				'actor ' + apId + ' not found in database, fetching'
			);
			return await ApResolverService.getSigned(apId);
		}
	}
}

export default new ApActorService();
