class RejectProcessor {
	public async process(body: ApObject): Promise<boolean> {
		return false;
	}
}

export default new RejectProcessor();
