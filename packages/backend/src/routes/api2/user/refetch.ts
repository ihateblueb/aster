import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApActorService from '../../../services/ap/ApActorService.js';
import UserService from '../../../services/UserService.js';
import locale from '../../../utils/locale.js';

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
		'/api/user/:id/refetch',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const user = await UserService.get({ id: req.params.id });

			if (!user) return reply.status(404).send();

			return await ApActorService.refetch(user.apId).then((e) => {
				if (e) return reply.status(200).send(e);
				return reply.status(500).send();
			});
		}
	);
});
