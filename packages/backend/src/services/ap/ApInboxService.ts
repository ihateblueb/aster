import logger from '../../utils/logger.js';
import ApValidationService from './ApValidationService.js';
import FollowProcessor from './inbox/FollowProcessor.js';

class ApInboxService {
	public async process(body) {
		
		if (body.type === 'Follow') {
			await FollowProcessor.process(body)
		} else {
			logger.warn('inbox', 'received activity of type '+body.type+' that has no processor')
		};

		return {
			status: 202
		};
	}
}

export default new ApInboxService();
