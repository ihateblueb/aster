import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import SearchService from '../../services/SearchService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Search'],
		querystring: {
			type: 'object',
			properties: {
				query: { type: 'string' }
			},
			required: ['query']
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/search',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await SearchService.search(
				req.query.query,
				req.auth.user.id
			).then((e) => {
				return reply.status(200).send(e);
			});
		}
	);
});
