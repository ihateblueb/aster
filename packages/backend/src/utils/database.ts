import config from './config.js';
import { DataSource } from 'typeorm';
import { Logger, QueryRunner } from 'typeorm';
import logger from './logger.js';

export class Typeormlogger implements Logger {
	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		logger.sql('query', query);
	}
	logQueryError(
		error: string | Error,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger.error('query', error);
		logger.error('query', query);
	}
	logQuerySlow(
		time: number,
		query: string,
		parameters?: any[],
		queryRunner?: QueryRunner
	) {
		logger.warn('query', time);
		logger.warn('query', query);
	}
	logSchemaBuild(message: string, queryRunner?: QueryRunner) {
		logger.info('db', message);
	}
	logMigration(message: string, queryRunner?: QueryRunner) {
		logger.info('db', message);
	}
	log(
		level: 'info' | 'warn' | 'log',
		message: any,
		queryRunner?: QueryRunner
	) {
		if (
			!message.startsWith('All classes found using provided glob pattern')
		) {
			if (level === 'log') {
				logger.info('db', message);
			} else if (level === 'warn') {
				logger.warn('db', message);
			} else if (level === 'info') {
				logger.info('db', message);
			}
		}
	}
}

const db = new DataSource({
	type: 'postgres',
	host: config.get().database.host,
	port: config.get().database.port,
	username: config.get().database.user,
	password: config.get().database.pass,
	database: config.get().database.name,
	entities: ['./built/entities/*.js'],
	migrations: ['./built/migrations/*.js'],
	logger: new Typeormlogger()
});

export default db;
