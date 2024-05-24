import config from './config.js';
import logger from './logger.js';

if (!config.redishost) {
	logger('fatal', 'core', 'no redis host configured');
}
if (!config.redisport) {
	logger('fatal', 'core', 'no redis port configured');
}

const redisConnection = {
	host: config.redishost,
	port: config.redisport
};

if (config.redisprefix) {
	redisConnection['keyPrefix'] = config.redisprefix;
}
if (config.redisdb) {
	redisConnection['db'] = config.redisdb;
}
if (config.redisuser) {
	redisConnection['username'] = config.redisuser;
}
if (config.redispass) {
	redisConnection['password'] = config.redispass;
}

export default redisConnection;
