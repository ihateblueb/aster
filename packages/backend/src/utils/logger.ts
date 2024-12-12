import chalk from 'chalk';
import cluster from 'cluster';

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

	public formatHttpId(id: string) {
		return chalk.gray(`(${id})`)
	}

	public formatStatus(status: number) {
		if (status.toString().startsWith('1')) return chalk.blue(status)
		if (status.toString().startsWith('2')) return chalk.green(status)
		if (status.toString().startsWith('3')) return chalk.cyan(status)
		if (status.toString().startsWith('4')) return chalk.yellow(status)
		if (status.toString().startsWith('5')) return chalk.red(status)
	}

	public sql(context: string, message: Message) {
		if (config.logging.sql) {
			this.log('sql', context, message);
		}
	}

	public http(context: string, message: Message) {
		if (config.logging.http) {
			this.log('http', context, message);
		}
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
		process.exit(1);
	}
}

export default new logger();
