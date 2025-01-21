import express from 'express';

import userAuth from '../../../middleware/userAuth.js';
import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post(
	'/api/note',
	bodyparser,
	oapi.path({
		description: 'Create a note',
		tags: ['Note'],
		security: [{ auth: [] }],
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
		// todo: test userAuth middleware
		const auth = res.locals.asAuth;

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
			parsedBody.replyingTo,
			parsedBody.attachments
		)
			.then(async (e) => {
				if (e.error) {
					return res.status(e.status).json({
						message: e.message
					});
				} else {
					return res.status(201).json(e.note);
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
