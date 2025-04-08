import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

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
		'/api/follow-request/:id/reject',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
