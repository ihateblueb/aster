const { DataSource, Logger } = require('typeorm')

const config = require('./config.js')

const dataSource = new DataSource({
	type: 'postgres',
	host: config.dbhost,
	port: config.dbport,
	username: config.dbuser,
	password: config.dbpass,
	database: config.dbname,
	entities: ['./src/entities/*.js'],
	migrations: ['./src/migrations/*.js'],
	logging: 'all'
})

dataSource
	.initialize()
	.then(() => {
		console.log('[database] database connected successfully!')
	})
	.catch((e) => {
		console.error('[database] ' + e)
		console.error('[database] fatal. now aborting.')
		process.exit(1)
	})

module.exports = dataSource
