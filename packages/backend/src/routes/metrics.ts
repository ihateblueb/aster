import plugin from 'fastify-plugin';

import MetricsService from '../services/MetricsService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Miscellaneous']
	} as const;

	fastify.get(
		'/metrics',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply
				.status(200)
				.header('Content-Type', 'text/plain')
				.send(await MetricsService.registry.metrics());
		}
	);
});
