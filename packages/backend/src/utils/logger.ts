import config from './config.js';

class logger {
	private log(level: string, region: string, message: string) {
		console.log(`${level} ${region} ${message}`);
	}

	public done(region: string, message: string) {
		this.log('done', region, message);
	}

	public sql(region: string, message: string) {
		if (config.logging.sql) {
			this.log('sql', region, message);
		}
	}

	public debug(region: string, message: string) {
		if (config.logging.debug) {
			this.log('debug', region, message);
		}
	}

	public info(region: string, message: string) {
		this.log('info', region, message);
	}

	public warn(region: string, message: string) {
		this.log('warn', region, message);
	}

	public error(region: string, message: string) {
		this.log('error', region, message);
	}

	public fatal(region: string, message: string) {
		this.log('fatal', region, message);
	}
}

export default new logger();
