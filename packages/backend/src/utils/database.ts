import { DataSource, Logger } from 'typeorm';
import process from 'node:process';
import config from './config';
import logger from './logger';
import { TypeormLogger } from './logger';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.dbhost,
	port: config.dbport,
	username: config.dbuser,
	password: config.dbpass,
	database: config.dbname,
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
