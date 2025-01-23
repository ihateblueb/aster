import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ModeratedInstanceService from '../../../../../services/ModeratedInstanceService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin']
	} as const;

	fastify.get(
		'/api/admin/federation/rules',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			const instances = await ModeratedInstanceService.getMany();
			return reply.status(200).send(instances);
		}
	);
});
