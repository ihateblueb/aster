import ConfigService from '../services/ConfigService.js';

const connection = {
	host: ConfigService.redis.host,
	port: ConfigService.redis.port
};

if (ConfigService.redis.database)
	connection['db'] = ConfigService.redis.database;
if (ConfigService.redis.user) connection['username'] = ConfigService.redis.user;
if (ConfigService.redis.pass) connection['password'] = ConfigService.redis.pass;

export default connection;
