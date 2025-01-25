class ValidationService {
	public validUrl(url: string) {
		let urlTest: URL;

		try {
			urlTest = new URL(url);
		} catch (_) {
			return false;
		}

		if (!['http:', 'https:'].includes(urlTest.protocol)) return false;

		if (
			urlTest.hostname === 'localhost' ||
			urlTest.hostname.startsWith('127.') ||
			urlTest.hostname.startsWith('::1')
		)
			return false;

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
