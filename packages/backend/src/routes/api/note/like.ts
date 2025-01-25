import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import LikeService from '../../../services/LikeService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Note'],
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
		'/api/note/:id/like',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await LikeService.create(
				req.params.id,
				req.auth.user.id,
				true
			).then((e) => {
				return reply.status(e.status).send({ message: e.message });
			});
		}
	);
});
