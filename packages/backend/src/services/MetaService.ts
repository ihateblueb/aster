import { In, Not } from 'typeorm';

import pkg from '../../../../package.json' with { type: 'json' };
import db from '../utils/database.js';
import CacheService from './CacheService.js';
import ConfigService from './ConfigService.js';
import MetricsService from './MetricsService.js';
import UserService from './UserService.js';

class MetaService {
	public async get() {
		if (ConfigService.cache.meta.enabled) {
			const cachedMeta = await CacheService.get('meta');

			if (cachedMeta) {
				MetricsService.metaCacheHits.inc(1);
				return JSON.parse(cachedMeta);
			} else {
				MetricsService.metaCacheMisses.inc(1);
			}
		}

		const userCount = await db.getRepository('user').count({
			where: {
				username: Not('instanceactor'),
				local: true,
				activated: true,
				suspended: false
			}
		});

		const noteCount = await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.where({
				user: {
					username: Not('instanceactor'),
					local: true,
					activated: true,
					suspended: false
				},
				visibility: In(['public', 'unlisted'])
			})
			.getCount();

		const admins = await UserService.getMany({
			admin: true
		});

		const meta = {
			software: pkg.name,
			version: pkg.version,
			registrations: ConfigService.registrations,
			name: 'aster dev instance',
			description:
				"welcome to the $[tada a]$[tada s]$[tada t]$[tada e]$[tada r] $[tada d]$[tada e]$[tada v] $[tada i]$[tada n]$[tada s]$[tada t]$[tada a]$[tada n]$[tada c]$[tada e]!\nfor now, this description isn't editable, but that will come later.",
			stats: {
				user: userCount,
				note: noteCount
			},
			admins: admins
		};

		if (ConfigService.cache.meta.enabled)
			await CacheService.set(
				'meta',
				JSON.stringify(meta),
				Number(ConfigService.cache.meta.expiration)
			);

		return meta;
	}
}

export default new MetaService();
