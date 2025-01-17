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
		let urlTest: URL;

		try {
			urlTest = new URL(url);
		} catch (_) {
			return false;
		}

		if (!['http:', 'https:'].includes(urlTest.protocol)) return false;

		urlTest = undefined;

		return true;
	}

	public validDate(date: string) {
		let dateTest: Date;

		try {
			dateTest = new Date(date);
		} catch (_) {
			return false;
		}

		dateTest = undefined;

		return true;
	}
}

export default new ValidationService();
