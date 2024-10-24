import redis from 'redis';

import config from '../utils/config.js';
import logger from '../utils/logger.js';
import connection from '../utils/redis.js';

const client = await redis
	.createClient({
		socket: {
			host: connection.host,
			port: connection.port
		},
		database: config.redis.database,
		name: config.redis.user,
		password: config.redis.pass
	})
	.on('error', (err) => {
		console.log(err);
	})
	.connect();

class CacheService {
	public client = client;
	public async get(key: string) {
		logger.debug(
			'cache',
			'getting ' + (config.redis.prefix + 'asterCache_' + key)
		);
		return await this.client.get(config.redis.prefix + 'asterCache_' + key);
	}
	public async set(key: string, val: string, expire?: number) {
		logger.debug(
			'cache',
			'setting ' +
				(config.redis.prefix + 'asterCache_' + key) +
				' to ' +
				val +
				(expire ? ' expiring in ' + expire : '')
		);
		return await this.client.set(
			config.redis.prefix + 'asterCache_' + key,
			val,
			{
				EX: expire
			}
		);
	}
}

export default new CacheService();
