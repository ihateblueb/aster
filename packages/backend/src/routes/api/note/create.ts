import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import config from '../../../utils/config.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/note',
	oapi.path({
		description: 'Create a note',
		tags: ['Note'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							cw: { type: 'string' },
							content: { type: 'string' },
							visibility: { type: 'string' },
							repeat: { type: 'string' }
						}
					}
				}
			}
		},
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

		await NoteService.create(
			auth.user.id,
			parsedBody.cw,
			parsedBody.content,
			parsedBody.visibility,
			parsedBody.repeat,
			parsedBody.replyingTo
		)
			.then(async (e) => {
				if (e.error) {
					return res.status(e.status).json({
						message: e.message
					});
				} else {
					return res.status(200).json(e.note);
				}
			})
			.catch((e) => {
				console.log(e);
				logger.error('note', 'failed to create note');

				return res.status(500).json({
					message: locale.error.internalServer
				});
			});
	}
);

export default router;
