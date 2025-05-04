import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import InviteService from '../../../../services/InviteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		}
	} as const;

	fastify.delete<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/admin/invite/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();
			return await InviteService.delete({ id: req.params.id }).then(
				() => {
					return reply.status(200).send();
				}
			);
		}
	);
});
