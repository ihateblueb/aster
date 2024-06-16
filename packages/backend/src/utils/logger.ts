import config from './config.js';
import chalk from 'chalk';
import { Logger, QueryRunner } from 'typeorm';

export default function logger(level: String, section: String, message?: any) {
	if (config.logging.type === 'fancy') {
		if (level === 'debug' && config.logging.debug) {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgCyan('debug') +
					' ' +
					chalk.cyan(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'info') {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgBlue('info') +
					' ' +
					chalk.blue(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'http') {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgMagenta('http') +
					' ' +
					chalk.magenta(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'sql' && config.logging.sql) {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgGreen('sql') +
					' ' +
					chalk.green(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'warn') {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgYellow('warn') +
					' ' +
					chalk.yellow(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'error') {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgRed('error') +
					' ' +
					chalk.red(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
		} else if (level === 'fatal') {
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgRedBright('fatal') +
					' ' +
					chalk.redBright(section.toLowerCase()) +
					']' +
					' ' +
					message
			);
			console.log(
				chalk.gray(new Date(Date.now()).toLocaleTimeString()) +
					' [' +
					chalk.bgRedBright('fatal') +
					' ' +
					chalk.redBright(section.toLowerCase()) +
					']' +
					' ' +
					'fatal. now aborting.'
			);
			process.exit(1);
		}
	} else if (config.logging.type === 'json') {
		console.log({
			level: level,
			section: section,
			time: new Date(Date.now()).toISOString(),
			message: message
		});
	}
}

export class TypeormLogger implements Logger {
	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		logger('sql', 'query', query);
	}
	logQueryError(
		error: string | Error,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger('error', 'query', error);
		logger('error', 'query', query);
	}
	logQuerySlow(
		time: number,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger('warn', 'query', time);
		logger('warn', 'query', query);
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
