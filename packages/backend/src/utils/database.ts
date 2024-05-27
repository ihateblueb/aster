import { DataSource, Logger } from 'typeorm';
import process from 'node:process';
import config from './config.js';
import logger from './logger.js';
import { TypeormLogger } from './logger.js';

const AppDataSource = new DataSource({
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

AppDataSource.initialize()
	.then(() => {
		logger('info', 'db', 'database connected successfully');
	})
	.catch((e) => {
		logger('fatal', 'db', e);
	});

export default AppDataSource;
