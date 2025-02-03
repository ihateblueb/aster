import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		body: {
			type: 'object',
			properties: {
				shortcode: { type: 'string', nullable: true },
				category: { type: 'string', nullable: true },
				file: { type: 'string', nullable: true }
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/admin/emoji',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			return reply.status(501).send();
		}
	);
});
