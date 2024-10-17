import ApValidationService from './ApValidationService.js';

class ApInboxService {
	public async process(body) {
		console.log(JSON.stringify(body));

		if (!ApValidationService.validBody(body))
			return {
				status: 400,
				message: 'Invalid body'
			};

		return {
			status: 202
		};
	}
}

export default new ApInboxService();
