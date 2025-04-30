import plugin from 'fastify-plugin';

import MetaService from '../../../services/MetaService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin']
	} as const;

	fastify.get<{}>(
		'/api/admin/meta',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			return reply.status(200).send(await MetaService.get(true));
		}
	);
});
