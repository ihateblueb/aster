import locale from '../utils/locale.js';

class ValidationService {
	public validateApiBody(body) {
		if (!body)
			return {
				error: true,
				status: 400,
				message: locale.error.bodyRequired
			};

		let parsedBody;

		try {
			parsedBody = JSON.parse(body);
		} catch (e) {
			return {
				error: true,
				status: 400,
				message: locale.error.bodyInvalid
			};
		}

		return {
			error: false,
			status: 200,
			body: parsedBody
		};
	}

	public validUrl(url: string) {
		let unusedUrlVar;

		try {
			unusedUrlVar = new URL(url);
		} catch (err) {
			return false;
		}

		unusedUrlVar = undefined;

		return true;
	}
}

export default new ValidationService();
