import express from 'express';

import AuthService from '../../../services/AuthService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/auth/login',
	oapi.path({
		description: 'Login as a user',
		tags: ['Auth'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						required: ['username', 'password'],
						properties: {
							username: { type: 'string' },
							password: { type: 'string' }
						}
					}
				}
			}
		},
		responses: {
			200: {
				description: 'User logged in',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								token: {
									type: 'string',
									description:
										'Token for the authenticated user.'
								}
							}
						}
					}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res, next) => {
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

		UserService.login(parsedBody.username, parsedBody.password)
			.then(async (e) => {
				if (e.error) {
					return res.status(e.status).json({
						message: e.message
					});
				} else {
					const token = await AuthService.generateToken(e.user.id);

					return res.status(200).json({
						id: e.user.id,
						token: token,
						message: locale.auth.success
					});
				}
			})
			.catch((e) => {
				console.log(e);
				logger.error('login', 'failed to authenticate user');

				return res.status(500).json({
					message: locale.error.internalServer
				});
			});

		// todo: blocking and muting? relationship service? should i split relationship to a different entity for this?
	}
);

export default router;
