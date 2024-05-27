import config from './config.js';
import logger from './logger.js';

if (!config.redis.host) {
	logger('fatal', 'core', 'no redis host configured');
}
if (!config.redis.port) {
	logger('fatal', 'core', 'no redis port configured');
}

const redisConnection = {
	host: config.redis.host,
	port: config.redis.port
};

if (config.redis.prefix) {
	redisConnection['keyPrefix'] = config.redis.prefix;
}
if (config.redis.database) {
	redisConnection['db'] = config.redis.database;
}
if (config.redis.user) {
	redisConnection['username'] = config.redis.user;
}
if (config.redis.pass) {
	redisConnection['password'] = config.redis.pass;
}

export default redisConnection;
