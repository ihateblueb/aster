import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import UserService from '../../../services/UserService.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Auth'],
		body: {
			type: 'object',
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				invite: { type: 'string', nullable: true }
			},
			required: ['username', 'password']
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/auth/register',
		{
			schema: schema
		},
		async (req, reply) => {
			const registrations = ConfigService.registrations;

			if (registrations === 'open') {
				await UserService.register(
					req.body.username,
					req.body.password
				).then(async (e) => {
					if (e.error) {
						return reply.status(e.status).send({
							message: e.message
						});
					} else {
						const token = await AuthService.generateToken(
							e.user.id
						);

						return reply.status(200).send({
							id: e.user.id,
							token: token
						});
					}
				});
			} else if (registrations === 'approval') {
				await UserService.register(
					req.body.username,
					req.body.password,
					true
				).then(async (e) => {
					if (e.error) {
						return reply.status(e.status).send({
							message: e.message
						});
					} else {
						return reply.status(200).send({
							id: e.user.id
						});
					}
				});
			} else if (registrations === 'invite') {
				if (!req.body.invite)
					return reply.status(400).send({
						message: locale.user.registration.inviteRequired
					});

				await UserService.register(
					req.body.username,
					req.body.password,
					false,
					req.body.invite
				).then(async (e) => {
					if (e.error) {
						return reply.status(e.status).send({
							message: e.message
						});
					} else {
						const token = await AuthService.generateToken(
							e.user.id
						);

						return reply.status(200).send({
							id: e.user.id,
							token: token
						});
					}
				});
			} else {
				return reply.status(401).send({
					message: locale.user.registration.closed
				});
			}
		}
	);
});
