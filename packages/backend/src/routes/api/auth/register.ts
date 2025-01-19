import express from 'express';

import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/auth/register',
	bodyparser,
	oapi.path({
		description: 'Register a new user',
		tags: ['Auth'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							username: { type: 'string' },
							password: { type: 'string' },
							invite: { type: 'string' }
						}
					}
				}
			}
		},
		responses: {
			200: {
				description: 'User registered',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
									description:
										"Newly registered account's id."
								},
								token: {
									type: 'string',
									description:
										'Token for the newly registered user.'
								}
							}
						}
					}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		if (!parsedBody.username)
			return res.status(400).json({
				message: locale.user.usernameRequired
			});

		if (!parsedBody.password)
			return res.status(400).json({
				message: locale.user.passwordRequired
			});

		const registrations = ConfigService.registrations;

		if (registrations === 'open') {
			await UserService.register(parsedBody.username, parsedBody.password)
				.then(async (e) => {
					if (e.error) {
						return res.status(e.status).json({
							message: e.message
						});
					} else {
						const token = await AuthService.generateToken(
							e.user.id
						);

						return res.status(200).json({
							id: e.user.id,
							token: token
						});
					}
				})
				.catch((e) => {
					console.log(e);
					logger.error('registration', 'failed to register user');

					return res.status(500).json({
						message: locale.error.internalServer
					});
				});
		} else if (registrations === 'approval') {
			await UserService.register(
				parsedBody.username,
				parsedBody.password,
				true
			)
				.then(async (e) => {
					if (e.error) {
						return res.status(e.status).json({
							message: e.message
						});
					} else {
						return res.status(200).json({
							id: e.user.id
						});
					}
				})
				.catch((e) => {
					console.log(e);
					logger.error('registration', 'failed to register user');

					return res.status(500).json({
						message: locale.error.internalServer
					});
				});
		} else if (registrations === 'invite') {
			if (!parsedBody.invite)
				return res.status(400).json({
					message: locale.user.registration.inviteRequired
				});

			await UserService.register(
				parsedBody.username,
				parsedBody.password,
				false,
				parsedBody.invite
			)
				.then(async (e) => {
					if (e.error) {
						return res.status(e.status).json({
							message: e.message
						});
					} else {
						const token = await AuthService.generateToken(
							e.user.id
						);

						return res.status(200).json({
							id: e.user.id,
							token: token
						});
					}
				})
				.catch((e) => {
					console.log(e);
					logger.error('registration', 'failed to register user');

					return res.status(500).json({
						message: locale.error.internalServer
					});
				});
		} else {
			if (registrations !== 'closed')
				logger.warn(
					'config',
					'"security.registrations" seems misconfigured. falling back to closed.'
				);

			return res.status(401).json({
				message: locale.user.registration.closed
			});
		}
	}
);

export default router;
