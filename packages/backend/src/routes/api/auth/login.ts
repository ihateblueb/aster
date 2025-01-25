import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import AuthService from '../../../services/AuthService.js';
import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Auth'],
		body: {
			type: 'object',
			properties: {
				username: { type: 'string' },
				password: { type: 'string' }
			},
			required: ['username', 'password']
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/auth/login',
		{
			schema: schema
		},
		async (req, reply) => {
			return await UserService.login(
				req.body.username,
				req.body.password
			).then(async (e) => {
				if (e.error) {
					return reply.status(e.status).send({
						message: e.message
					});
				} else {
					const token = await AuthService.generateToken(e.user.id);

					return reply.status(200).send({
						id: e.user.id,
						token: token
					});
				}
			});
		}
	);
});
