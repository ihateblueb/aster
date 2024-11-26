import { In, Not } from 'typeorm';
import pkg from '../../../../package.json' with { type: 'json' };
import db from '../utils/database.js';
import config from '../utils/config';
import CacheService from './CacheService';
import MetricsService from './MetricsService';

class MetaService {
	public async get() {
        if (config.cache.meta) {
            let cachedMeta = await CacheService.get('meta');
            
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
				'user.local': true,
				visibility: In(['public', 'unlisted'])
			})
			.getCount();

        let meta = {
            software: pkg.name,
            version: pkg.version,
            registrations: config.registrations,
            stats: {
                user: userCount,
                note: noteCount
            }
        }

        if (config.cache.meta)
					await CacheService.set(
						'meta',
						JSON.stringify(meta),
						Number(config.cache.metaExpiration)
					);

        return meta;
	}
}

export default new MetaService();
