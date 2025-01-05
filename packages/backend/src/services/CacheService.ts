import redis from 'redis';

import logger from '../utils/logger.js';
import connection from '../utils/redis.js';
import ConfigService from './ConfigService.js';

const client = await redis
	.createClient({
		socket: {
			host: connection.host,
			port: connection.port
		},
		database: ConfigService.redis.database,
		name: ConfigService.redis.user,
		password: ConfigService.redis.pass
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
			'getting ' + (ConfigService.redis.prefix + 'asterCache_' + key)
		);
		return await this.client.get(
			ConfigService.redis.prefix + 'asterCache_' + key
		);
	}
	public async set(key: string, val: string, expire?: number) {
		logger.debug(
			'cache',
			'setting ' +
				(ConfigService.redis.prefix + 'asterCache_' + key) +
				' to ' +
				val +
				(expire ? ' expiring in ' + expire : '')
		);
		return await this.client.set(
			ConfigService.redis.prefix + 'asterCache_' + key,
			val,
			{
				EX: expire
			}
		);
	}
}

export default new CacheService();
