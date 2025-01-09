import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NotificationService from '../../../services/NotificationService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.post(
	'/api/notifications/read',
	oapi.path({
		description: 'Read notifications',
		tags: ['Notification'],
		security: [{ auth: [] }],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						required: ['notifications'],
						properties: {
							notifications: { type: 'object' }
						}
					}
				}
			}
		},
		responses: {
			200: {
				description: 'Return a notification.'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		if (!Array.isArray(parsedBody))
			return res.status(400).json({
				message: 'Must be array'
			});

		if (parsedBody.length > 100) {
			res.status(400).json({
				message: 'Too many items'
			});
		}

		for (const notification of parsedBody) {
			await NotificationService.read(notification);
		}

		return res.status(200).send();
	}
);

export default router;
