import express from 'express';

import AuthService from '../../../services/AuthService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import db from '../../../utils/database.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/auth/revoke',
	oapi.path({
		description: 'Revoke a valid auth token',
		tags: ['Auth'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							token: { type: 'string' }
						}
					}
				}
			}
		},
		responses: {
			200: {
				description: 'Token revoked'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res, next) => {
		let auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		let bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		let parsedBody = bodyValidation.body;

		if (!parsedBody.token)
			return res.status(400).json({
				message: locale.auth.tokenRequired
			});

		let tokenBeingRevoked = await db.getRepository('auth').findOne({
			where: {
				token: parsedBody.token
			}
		});

		console.log(tokenBeingRevoked.user);
		console.log(auth.user);

		if (tokenBeingRevoked.user === auth.user) {
			try {
				await db.getRepository('auth').delete({
					token: parsedBody.token
				});
			} catch (e) {
				return res.status(500).json({
					message: locale.error.internalServer
				});
			}

			return res.status(200).json({
				message: locale.auth.tokenRevoked
			});
		} else {
			return res.status(400).json({
				message: locale.auth.tokenInvalid
			});
		}
	}
);

export default router;