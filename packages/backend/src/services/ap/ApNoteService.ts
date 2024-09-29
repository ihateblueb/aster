import logger from '../../utils/logger.js';
import db from '../../utils/database.js';
import ApResolverService from './ApResolverService.js';
import ApNoteProcessor from './processors/ApNoteProcessor.js';

class ApNoteService {
	public async get(apId: string, cache?: boolean): Promise<object> {
		logger.debug('ap', 'getting note by id ' + apId);

		let actor = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({ ap_id: apId })
			.cache(cache)
			.getOne();

		if (actor) {
			logger.debug('ap', 'note ' + apId + ' found in database');
			return actor;
		} else {
			logger.debug(
				'ap',
				'note ' + apId + ' not found in database, fetching'
			);
			return await ApNoteProcessor.new(
				await ApResolverService.getSigned(apId)
			);
		}
	}
}

export default new ApNoteService();
