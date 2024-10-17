class RejectProcessor {
	public async process(body): Promise<boolean> {
		return false;
	}
}

export default new RejectProcessor();
