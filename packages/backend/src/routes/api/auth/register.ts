import express from 'express';
import oapi from '../../../utils/apidoc.js';
import logger from '../../../utils/logger.js';
import config from '../../../utils/config.js';

import UserService from '../../../services/UserService.js';
import AuthService from '../../../services/AuthService.js';

const router = express.Router();

router.post(
	'/api/auth/register',
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
	(req, res) => {
		if (!req.body)
			return res.status(400).json({
				message: 'Body required'
			});

		let parsedBody;

		try {
			parsedBody = JSON.parse(req.body);
		} catch (e) {
			return res.status(500).json({
				message: 'Failed to parse body'
			});
		}

		if (!parsedBody.username)
			return res.status(400).json({
				message: 'Username required'
			});

		if (!parsedBody.password)
			return res.status(400).json({
				message: 'Password required'
			});

		let registrations = config.registrations
			? config.registrations
			: 'closed';

		if (registrations === 'open') {
			UserService.register(parsedBody.username, parsedBody.password)
				.then(async (e) => {
					if (e.error) {
						return res.status(e.status).json({
							message: e.message
						});
					} else {
						let token = await AuthService.generateToken(e.user.id);

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
						message: 'Internal server error'
					});
				});
		} else if (registrations === 'approval') {
			UserService.register(
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
						message: 'Internal server error'
					});
				});
		} else if (registrations === 'invite') {
			if (!parsedBody.invite)
				return res.status(400).json({
					message: 'Invite required'
				});

			UserService.register(
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
						let token = await AuthService.generateToken(e.user.id);

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
						message: 'Internal server error'
					});
				});
		} else {
			if (registrations !== 'closed')
				logger.warn(
					'config',
					'"security.registrations" seems misconfigured. falling back to closed.'
				);

			return res.status(401).json({
				message: 'Registrations closed'
			});
		}
	}
);

export default router;
