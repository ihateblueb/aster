class ApiRequestValidationService {
	public validateBody(body) {
		if (!body)
			return {
				error: true,
				status: 400,
				message: 'Body required'
			};

		let parsedBody;

		try {
			parsedBody = JSON.parse(body);
		} catch (e) {
			return {
				error: true,
				status: 400,
				message: 'Body required'
			};
		}

		return {
			error: false,
			status: 200,
			body: parsedBody
		};
	}
}

export default new ApiRequestValidationService();
