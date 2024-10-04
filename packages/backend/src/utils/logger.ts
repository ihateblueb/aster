class logger {
	private log(level: string, region: string, message: string) {
		console.log(`${level} ${region} ${message}`);
	}

	public done(region: string, message: string) {
		this.log('done', region, message);
	}

	public info(region: string, message: string) {
		this.log('info', region, message);
	}
}

export default new logger();
