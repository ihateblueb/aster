class ApInboxService {
	public async process(body) {
		console.log(JSON.stringify(body));

		return;
	}
}

export default new ApInboxService();
