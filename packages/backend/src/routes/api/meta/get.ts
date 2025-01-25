import plugin from 'fastify-plugin';

import MetaService from '../../../services/MetaService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Meta']
	} as const;

	fastify.get(
		'/api/meta',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(200).send(await MetaService.get());
		}
	);
});
