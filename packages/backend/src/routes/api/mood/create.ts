import express from 'express';

import userAuth from '../../../middleware/userAuth.js';
import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/mood',
	oapi.path({
		description: 'Create a mood',
		tags: ['Mood'],
		security: [{ auth: [] }],
		requestBody: {
			content: {
				'application/json': {}
			}
		},
		responses: {
			200: {
				description: 'Return the created mood.',
				content: {
					'application/json': {}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	await userAuth,
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

		return res.status(501).send();
	}
);

export default router;
