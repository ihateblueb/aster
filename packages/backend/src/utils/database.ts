import { DataSource, Logger } from 'typeorm';
import process from 'node:process';
import config from './config.js';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.dbhost,
	port: config.dbport,
	username: config.dbuser,
	password: config.dbpass,
	database: config.dbname,
	entities: ['./src/entities/*.ts'],
	migrations: ['./src/migrations/*.ts'],
	logging: 'all'
});

AppDataSource.initialize()
	.then(() => {
		console.log('[database] database connected successfully!');
	})
	.catch((e) => {
		console.error('[database] ' + e);
		console.error('[database] fatal. now aborting.');
		process.exit(1);
	});
