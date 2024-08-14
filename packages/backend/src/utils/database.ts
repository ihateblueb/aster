import config from './config.js';
import { TypeormLogger } from './logger.js';
import { DataSource } from 'typeorm';

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
