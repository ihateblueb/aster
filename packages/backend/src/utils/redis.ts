import config from './config.js';
import Logger from './logger.js';

if (!config.get().redis.host) {
	Logger.fatal('core', 'no redis host configured');
}
if (!config.get().redis.port) {
	Logger.fatal('core', 'no redis port configured');
}

const redisConnection = {
	host: config.get().redis.host,
	port: config.get().redis.port
};

if (config.get().redis.prefix) {
	redisConnection['keyPrefix'] = config.get().redis.prefix;
}
if (config.get().redis.database) {
	redisConnection['db'] = config.get().redis.database;
}
if (config.get().redis.user) {
	redisConnection['username'] = config.get().redis.user;
}
if (config.get().redis.pass) {
	redisConnection['password'] = config.get().redis.pass;
}

export default redisConnection;
