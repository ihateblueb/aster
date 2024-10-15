import config from './config.js';
import logger from './logger.js';

if (!config.redis.host) logger.fatal('redis', 'no redis host configured');
if (!config.redis.port) logger.fatal('redis', 'no redis port configured');

const connection = {
	host: config.redis.host,
	port: config.redis.port
};

if (config.redis.prefix) connection['keyPrefix'] = config.redis.prefix;
if (config.redis.database) connection['db'] = config.redis.database;
if (config.redis.user) connection['username'] = config.redis.user;
if (config.redis.pass) connection['password'] = config.redis.pass;

export default connection;
