import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/user/:id/bite',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await UserService.bite(req.params.id, req.auth.user.id).then(
				(e) => {
					return reply.status(e.status).send({ message: e.message });
				}
			);
		}
	);
});
