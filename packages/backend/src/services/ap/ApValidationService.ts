class ApValidationService {
	public async validSignature(body: object): Promise<boolean> {
		return false;
	}
	
	public async validBody(body): Promise<boolean> {
		if (!body.type) return false;

		return true;
	}
}

export default new ApValidationService();
