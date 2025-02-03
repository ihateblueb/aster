import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Emoji'],
		querystring: {
			type: 'object',
			properties: {
				remote: { type: 'string', nullable: true } // admin only
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/emojis',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
