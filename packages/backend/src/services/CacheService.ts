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
	public keyPrefix: string = ConfigService.redis.prefix
		? ConfigService.redis.prefix + ':cache:'
		: 'cache:';

	public async get(key: string) {
		logger.debug('cache', 'getting ' + this.keyPrefix + key);
		return await this.client.get(this.keyPrefix + key);
	}

	public async set(key: string, val: string, expire?: number) {
		logger.debug(
			'cache',
			'setting ' +
				(this.keyPrefix + key) +
				' to ' +
				val +
				(expire ? ' expiring in ' + expire : '')
		);

		return await this.client.set(
			this.keyPrefix + key,
			val,
			expire
				? {
						EX: expire
					}
				: {}
		);
	}

	public async del(key: string | string[]) {
		logger.debug('cache', 'deleting ' + key);
		return await this.client.del(key);
	}

	public async scan(match: string) {
		let cursor = 0;
		let keys = [];

		while (true) {
			const result = await this.client.scan(cursor, {
				MATCH: this.keyPrefix + match,
				COUNT: 100
			});

			cursor = result.cursor;
			keys.push(...result.keys);

			if (cursor === 0) break;
		}

		return keys;
	}

	public async scanAndDel(match: string) {
		let keys = await this.scan(match);
		return keys && keys.length > 0 ? await this.del(keys) : 0;
	}

	public async clear() {
		const match = this.keyPrefix + '*';
		return await this.scanAndDel(match);
	}
}

export default new CacheService();
