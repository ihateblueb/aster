import { DataSource, Logger } from 'typeorm';

import config from './config.js';
import logger from './logger.js';

export class TypeormLogger implements Logger {
	logQuery(query: string) {
		logger.sql('query', query);
	}

	logQueryError(error: string | Error, query: string) {
		logger.error('query', error.toString());
		logger.error('query', query);
	}

	logQuerySlow(time: number, query: string) {
		logger.warn('query', time.toString());
		logger.warn('query', query);
	}

	logSchemaBuild(message: string) {
		logger.info('db', message);
	}

	logMigration(message: string) {
		logger.info('db', message);
	}

	log(level: 'info' | 'warn' | 'log', message: any) {
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
	host: config.database.host,
	port: config.database.port,
	username: config.database.user,
	password: config.database.pass,
	database: config.database.name,
	entities: ['./built/entities/*.js'],
	migrations: ['./built/migrations/*.js'],
	logger: new TypeormLogger()
});

export default db;
