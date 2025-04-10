import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import RelationshipService from '../../../services/RelationshipService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Follow Requests'],
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
		'/api/follow-request/:id/accept',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await RelationshipService.acceptFollow(req.params.id).then(
				(e) => {
					return reply.status(e.status).send({
						message: e.message
					});
				}
			);
		}
	);
});
