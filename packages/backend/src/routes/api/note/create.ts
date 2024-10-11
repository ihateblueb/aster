import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import config from '../../../utils/config.js';

const router = express.Router();

router.post(
	'/api/note',
	oapi.path({
		description: 'Create a note',
		tags: ['Note'],
		responses: {
			200: {
				description: 'Return the created note.',
				content: {
					'application/json': {
						$ref: '#/components/schemas/Note'
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
	async (req, res) => {
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

		// move later
		if (!parsedBody.content || parsedBody.content.length < 0)
			return res.status(400).json({
				message: 'Content required'
			});

		if (parsedBody.content.length > config.limits.soft.note)
			return res.status(400).json({
				message: 'Content too long'
			});

		res.status(501).send();
	}
);

export default router;
