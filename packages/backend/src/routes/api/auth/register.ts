import express from 'express';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.post(
	'/api/auth/register',
	oapi.validPath({
		description: 'Register a new user',
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							username: { type: 'string' },
							password: { type: 'string' },
							invite: { type: 'string', required: false }
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
	(err, req, res, next) => {
		console.log(err);
		res.status(501).json({
			message: 'not done lol'
		});
	}
);

export default router;
