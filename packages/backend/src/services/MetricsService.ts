import * as client from 'prom-client';

const registry = new client.Registry();

const apUserCacheHits = new client.Counter({
	name: 'ap_user_cache_hits',
	help: 'Number of times the cache was used for ActivityPub user requests.'
});
const apUserCacheMisses = new client.Counter({
	name: 'ap_user_cache_misses',
	help: 'Number of times the cache was not used for ActivityPub user requests.'
});
const apMetaCacheHits = new client.Counter({
	name: 'ap_meta_cache_hits',
	help: 'Number of times the cache was used for nodeinfo requests.'
});
const apMetaCacheMisses = new client.Counter({
	name: 'ap_meta_cache_misses',
	help: 'Number of times the cache was not used for nodeinfo requests.'
});
const apNoteCacheHits = new client.Counter({
	name: 'ap_note_cache_hits',
	help: 'Number of times the cache was used for ActivityPub note requests.'
});
const apNoteCacheMisses = new client.Counter({
	name: 'ap_note_cache_misses',
	help: 'Number of times the cache was not used for ActivityPub note requests.'
});
const metaCacheHits = new client.Counter({
	name: 'meta_cache_hits',
	help: 'Number of times the cache was used for instance metadata  requests.'
});
const metaCacheMisses = new client.Counter({
	name: 'meta_cache_misses',
	help: 'Number of times the cache was not used for instance metadata requests.'
});

class MetricsService {
	public registry = registry;

	public apUserCacheHits = apUserCacheHits;
	public apUserCacheMisses = apUserCacheMisses;
	public apMetaCacheHits = apMetaCacheHits;
	public apMetaCacheMisses = apMetaCacheMisses;
	public apNoteCacheHits = apNoteCacheHits;
	public apNoteCacheMisses = apNoteCacheMisses;
	public metaCacheHits = metaCacheHits;
	public metaCacheMisses = metaCacheMisses;

	public registerMetrics() {
		registry.registerMetric(apUserCacheHits);
		registry.registerMetric(apUserCacheMisses);
		registry.registerMetric(apMetaCacheHits);
		registry.registerMetric(apMetaCacheMisses);
		registry.registerMetric(apNoteCacheHits);
		registry.registerMetric(apNoteCacheMisses);
		registry.registerMetric(metaCacheHits);
		registry.registerMetric(metaCacheMisses);
	}
}

export default new MetricsService();
