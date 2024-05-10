import chalk from 'chalk';
import { Logger, QueryRunner } from 'typeorm';

import config from './config';

export default function logger(level: String, section: String, message?: any) {
	if (config.logging === 'fancy') {
		if (level === 'debug' && config.debug) {
			console.log(
				'[' +
					chalk.bgCyan('debug') +
					' ' +
					chalk.cyan(section) +
					']' +
					' ' +
					message
			);
		} else if (level === 'info') {
			console.log(
				'[' +
					chalk.bgBlue('info') +
					' ' +
					chalk.blue(section) +
					']' +
					' ' +
					message
			);
		} else if (level === 'warn') {
			console.log(
				'[' +
					chalk.bgYellow('warn') +
					' ' +
					chalk.yellow(section) +
					']' +
					' ' +
					message
			);
		} else if (level === 'error') {
			console.log(
				'[' +
					chalk.bgRed('error') +
					' ' +
					chalk.red(section) +
					']' +
					' ' +
					message
			);
		} else if (level === 'fatal') {
			console.log(
				'[' +
					chalk.bgRedBright('fatal') +
					' ' +
					chalk.redBright(section) +
					']' +
					' ' +
					message
			);
			console.log(
				'[' +
					chalk.bgRedBright('fatal') +
					' ' +
					chalk.redBright(section) +
					']' +
					' ' +
					'fatal. now aborting.'
			);
			process.exit(1);
		}
	} else if (config.logging === 'json') {
		console.log({
			level: `${level}`,
			section: `${section}`,
			message: message
		});
	}
}

export class TypeormLogger implements Logger {
	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		logger('info', 'db', query);
	}
	logQueryError(
		error: string | Error,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger('error', 'db', error);
		logger('error', 'db', query);
	}
	logQuerySlow(
		time: number,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger('warn', 'db', time);
		logger('warn', 'db', query);
	}
	logSchemaBuild(message: string, queryRunner?: QueryRunner) {
		logger('info', 'db', message);
	}
	logMigration(message: string, queryRunner?: QueryRunner) {
		logger('info', 'db', message);
	}
	log(
		level: 'info' | 'warn' | 'log',
		message: any,
		queryRunner?: QueryRunner
	) {
		if (level === 'log') {
			logger('info', 'db', message);
		} else {
			logger(level, 'db', message);
		}
	}
}
