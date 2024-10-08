import logger from '../utils/logger.js';

class UserRegistrationService {
	public async register(username: string, password: string, invite?: string) {
		logger.debug('registration', 'username: '+username+', password: '+password+', invite: '+invite);
	}
}

export default new UserRegistrationService();
