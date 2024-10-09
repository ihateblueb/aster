import express from 'express';

import oapi from '../../../utils/apidoc.js';

import ValidationService from '../../../services/ValidationService.js';

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
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res, next) => {
		let bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		let parsedBody = bodyValidation.body;

		if (!parsedBody.username)
			return res.status(400).json({
				message: 'Username required'
			});

		if (!parsedBody.password)
			return res.status(400).json({
				message: 'Password required'
			});

		// todo: user service get private or something to compare?
		// todo: blocking and muting? relationship service? should i split relationship to a different entity for this?

		return res.status(501);
	}
);

export default router;
