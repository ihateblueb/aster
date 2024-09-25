import logger from '../../utils/logger';
import ApValidationService from './ApValidationService';

class ApDeliveryService {
	public async deliver(body: object, inbox: string) {
		if (!ApValidationService.isValidObject(body)) {
			logger.error('deliver', 'refused to deliver invalid ap object');
			return;
		}

		return;
	}
}

export default new ApDeliveryService();
