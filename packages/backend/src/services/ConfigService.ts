import { readFile } from 'node:fs/promises';

import os from 'os';
import * as yaml from 'yaml';

import localeIndex from '../../../../locale/index.json' assert { type: 'json' };
import logger from '../utils/logger.js';
import tryUrl from '../utils/tryUrl.js';

let textConfig = await readFile(`../../config/production.yaml`, {
	encoding: 'utf-8'
});
const parsedConfig = yaml.parse(textConfig);

function ValidUrl(url: string): URL {
	if (tryUrl(url)) return new URL(url);
	logger.fatal('config', 'invalid url');
}
function NumberMinMax(num: number, min: number, max: number): number {
	if (num >= max) return max;
	if (num <= min) return min;
	return num;
}
function StringIncluding(str: string, inc: string[]): string | undefined {
	if (inc.includes(str)) return str;
	return undefined;
}

class ConfigService {
	public url: URL = ValidUrl(parsedConfig.url);
	public port: number = NumberMinMax(parsedConfig.port, 0, 65535) ?? 9972;

	public registrations: string =
		StringIncluding(parsedConfig.closed, [
			'open',
			'approval',
			'invite',
			'closed'
		]) ?? 'closed';

	public id: string =
		StringIncluding(parsedConfig.id, [
			'aidx',
			'aid',
			'meid',
			'meidg',
			'objectid',
			'ulid',
			'uuidv4',
			'uuidv7'
		]) ?? 'aidx';

	public locale: string =
		StringIncluding(parsedConfig.locale, localeIndex.locales) ?? 'en_US';

	public bubbleTimeline = new (class BubbleTimelineService {
		public enabled: boolean = Boolean(
			parsedConfig.bubbleTimeline.enabled ?? false
		);
		public instances: string[] = Array.isArray(
			parsedConfig.bubbleTimeline.instances
		)
			? parsedConfig.bubbleTimeline.instances
			: [];
	})();

	public authorizedFetch: boolean = Boolean(
		parsedConfig.authorizedFetch ?? false
	);

	public workers = new (class WorkersConfig {
		public count: number =
			NumberMinMax(parsedConfig.count, 1, os.cpus().length) ?? 4;
	})();

	public database = new (class DatabaseConfig {
		public host: string = parsedConfig.database.host ?? 'localhost';
		public port: number =
			NumberMinMax(parsedConfig.database.port, 0, 65535) ?? 5432;

		public name: string = parsedConfig.database.name ?? 'aster';
		public user: string = parsedConfig.database.user ?? 'aster';
		public pass: string = parsedConfig.database.pass; // this can be undefined, typeorm will fail on boot
	})();

	public redis = new (class RedisConfig {
		public host: string = parsedConfig.redis.host ?? 'localhost';
		public port: number =
			NumberMinMax(parsedConfig.redis.port, 0, 65535) ?? 6379;

		public prefix: string | undefined =
			parsedConfig.redis.prefix ?? undefined;
		public database: number | undefined =
			parsedConfig.redis.database ?? undefined;

		public user: string | undefined = parsedConfig.redis.user ?? undefined;
		public pass: string | undefined = parsedConfig.redis.pass ?? undefined;
	})();

	public cache = new (class CacheConfig {
		public ap = new (class ApCacheConfig {
			public enabled: boolean = Boolean(
				parsedConfig.cache.ap.enabled ?? true
			);
			public expiration: number = NumberMinMax(
				parsedConfig.cache.ap.expiration ?? 150,
				1,
				10000
			);
		})();
		public api = new (class ApiCacheConfig {
			public enabled: boolean = Boolean(
				parsedConfig.cache.api.enabled ?? true
			);
			public expiration: number = NumberMinMax(
				parsedConfig.cache.api.expiration ?? 150,
				1,
				10000
			);
		})();
		public meta = new (class MetaCacheConfig {
			public enabled: boolean = Boolean(
				parsedConfig.cache.meta.enabled ?? true
			);
			public expiration: number = NumberMinMax(
				parsedConfig.cache.meta.expiration ?? 150,
				1,
				10000
			);
		})();
	})();

	public queue = new (class QueueConfig {
		public inbox = new (class InboxQueueConfig {
			public attempts: number =
				NumberMinMax(parsedConfig.queue.inbox.attempts, 1, 500) ?? 35;
			public backoff: number =
				NumberMinMax(parsedConfig.queue.inbox.backoff, 1, 604800000) ??
				10000;
			public concurrency: number =
				NumberMinMax(parsedConfig.queue.inbox.concurrency, 1, 500) ??
				25;
		})();
		public deliver = new (class DeliverQueueConfig {
			public attempts: number =
				NumberMinMax(parsedConfig.queue.deliver.attempts, 1, 500) ?? 75;
			public backoff: number =
				NumberMinMax(
					parsedConfig.queue.deliver.backoff,
					1,
					604800000
				) ?? 25000;
			public concurrency: number =
				NumberMinMax(parsedConfig.queue.deliver.concurrency, 1, 500) ??
				25;
		})();
		public backfill = new (class BackfillQueueConfig {
			public attempts: number =
				NumberMinMax(parsedConfig.queue.backfill.attempts, 1, 500) ??
				10;
			public backoff: number =
				NumberMinMax(
					parsedConfig.queue.backfill.backoff,
					1,
					604800000
				) ?? 3600000;
			public concurrency: number =
				NumberMinMax(parsedConfig.queue.backfill.concurrency, 1, 500) ??
				25;
		})();
	})();

	public timeline = new (class TimelineConfig {
		public maxObjects: number =
			NumberMinMax(parsedConfig.timeline.maxObjects, 1, 100) ?? 45;
	})();

	public logging = new (class LoggingConfig {
		public http: boolean = Boolean(parsedConfig.logging.http ?? true);
		public debug: boolean = Boolean(parsedConfig.logging.debug ?? false);
		public sql: boolean = Boolean(parsedConfig.logging.sql ?? false);
		public type: string =
			StringIncluding(parsedConfig.logging.type, ['json', 'fancy']) ??
			'fancy';
	})();

	public router = new (class RouterConfig {
		public frontend: boolean = Boolean(
			parsedConfig.router.frontend ?? true
		);
		public queue: boolean = Boolean(parsedConfig.router.queue ?? true);
		public oapi: boolean = Boolean(parsedConfig.router.oapi ?? true);
		public swagger: boolean = Boolean(parsedConfig.router.swagger ?? true);
	})();

	public metrics = new (class MetricsConfig {
		public enabled: boolean = Boolean(parsedConfig.metrics.enabled);
	})();

	public security = new (class SecurityConfig {
		public blockedUserAgents: string[] = Array.isArray(
			parsedConfig.security.blockedUserAgents
		)
			? parsedConfig.security.blockedUserAgents
			: [];
	})();

	public limits = new (class LimitsConfig {
		public soft = new (class SoftLimitsConfig {
			public password: number =
				NumberMinMax(parsedConfig.limits.soft.password, 8, 1000) ?? 150;

			public cw: number =
				NumberMinMax(parsedConfig.limits.soft.cw, 1, 10000) ?? 5000;
			public note: number =
				NumberMinMax(parsedConfig.limits.soft.note, 1, 1000000) ??
				20000;

			public username: number =
				NumberMinMax(parsedConfig.limits.soft.username, 1, 1000) ?? 500;
			public displayName: number =
				NumberMinMax(parsedConfig.limits.soft.displayName, 1, 1000) ??
				500;

			public bio: number =
				NumberMinMax(parsedConfig.limits.soft.bio, 1, 1000000) ?? 20000;
			public location: number =
				NumberMinMax(parsedConfig.limits.soft.location, 1, 20000) ??
				1000;
			public birthday: number =
				NumberMinMax(parsedConfig.limits.soft.location, 1, 500) ?? 100;
		})();

		public hard = new (class HardLimitsConfig {
			public url: number =
				NumberMinMax(parsedConfig.limits.soft.password, 1, 100000) ??
				10000;

			public key: number =
				NumberMinMax(parsedConfig.limits.soft.password, 1, 100000) ??
				10000;
			public host: number =
				NumberMinMax(parsedConfig.limits.soft.password, 1, 250000) ??
				25000;

			public cw: number =
				NumberMinMax(parsedConfig.limits.soft.cw, 1, 50000) ?? 50000;
			public note: number =
				NumberMinMax(parsedConfig.limits.soft.note, 1, 1000000) ??
				100000;

			public username: number =
				NumberMinMax(parsedConfig.limits.soft.username, 1, 5000) ??
				2500;
			public displayName: number =
				NumberMinMax(parsedConfig.limits.soft.displayName, 1, 7500) ??
				5000;

			public bio: number =
				NumberMinMax(parsedConfig.limits.soft.bio, 1, 1000000) ??
				100000;
			public location: number =
				NumberMinMax(parsedConfig.limits.soft.location, 1, 20000) ??
				5000;
			public birthday: number =
				NumberMinMax(parsedConfig.limits.soft.location, 1, 20000) ??
				500;
		})();
	})();
}

export default new ConfigService();
