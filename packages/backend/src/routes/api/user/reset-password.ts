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
		},
		body: {
			type: 'object',
			properties: {
				password: { type: 'string' } //todo: max length
			},
			required: ['password']
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/user/:id/reset-password',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const user = await UserService.get({ id: req.params.id });

			if (!user) return reply.status(404).send();

			if (user.id !== req.auth.user.id && !req.auth.user.admin)
				return reply.status(403).send();

			return await UserService.resetPassword(
				user.id,
				req.body.password
			).then((e) => {
				return reply.status(200).send(e);
			});
		}
	);
});
