import cluster from 'cluster';
import chalk from 'chalk';
import config from './config.js';

type Level =
	| 'sql'
	| 'http'
	| 'debug'
	| 'info'
	| 'warn'
	| 'done'
	| 'error'
	| 'fatal';

type Message = string | string[] | number | boolean | object | Error;

class logger {
	private log(level: Level, context: string, message: Message) {
		if (config.logging.type === 'json') {
			console.log({
				level: level,
				worker: cluster.isPrimary ? 0 : cluster.worker.id,
				time: new Date(Date.now()).toISOString(),
				context: context.toLowerCase(),
				message: message
			});
		} else if (config.logging.type === 'fancy') {
			let string = chalk.bold(
				cluster.isPrimary ? '*' : cluster.worker.id
			);

			if (level === 'sql') string += '	' + chalk.green(chalk.bold(level));
			if (level === 'http')
				string += '	' + chalk.magenta(chalk.bold(level));
			if (level === 'debug') string += '	' + chalk.cyan(chalk.bold(level));
			if (level === 'info') string += '	' + chalk.blue(chalk.bold(level));
			if (level === 'warn')
				string += '	' + chalk.yellow(chalk.bold(level));
			if (level === 'done')
				string += '	' + chalk.greenBright(chalk.bold(level));
			if (level === 'error') string += '	' + chalk.red(chalk.bold(level));
			if (level === 'fatal')
				string += '	' + chalk.redBright(chalk.bold(level));

			string +=
				'	' + chalk.gray(context.substring(0, 7).toLowerCase()) + '	';

			string += '  ' + message;

			console.log(string);
		}
	}

	public sql(context: string, message: Message) {
		if (config.logging.sql) {
			this.log('sql', context, message);
		}
	}

	public http(context: string, message: Message) {
		this.log('http', context, message);
	}

	public debug(context: string, message: Message) {
		if (config.logging.debug) {
			this.log('debug', context, message);
		}
	}

	public info(context: string, message: Message) {
		this.log('info', context, message);
	}

	public warn(context: string, message: Message) {
		this.log('warn', context, message);
	}

	public done(context: string, message: Message) {
		this.log('done', context, message);
	}

	public error(context: string, message: Message) {
		this.log('error', context, message);
	}

	public fatal(context: string, message: Message) {
		this.log('fatal', context, message);
	}
}

export default new logger();
