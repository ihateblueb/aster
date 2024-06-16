import config from './config.js';
import logger, { TypeormLogger } from './logger.js';
import { DataSource } from 'typeorm';

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
