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
	'/api/note/:id/repeat',
	oapi.path({
		description: 'Repeat a note',
		tags: ['Note'],
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							visibility: { type: 'string' }
						}
					}
				}
			}
		},
		responses: {
			200: {},
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

		// todo: solidify this. move it to the NoteService.

		let existingRepeat = await NoteService.get({
			user: { id: auth.user },
			repeat: { id: req.params.id }
		});

		if (existingRepeat) {
			logger.debug('note', 'repeat exists');
			await NoteService.delete({ id: existingRepeat.id })
				.then(async () => {
					logger.debug('note', 'repeat deleted');
					return res.status(200).json({
						message: locale.note.deleted
					});
				})
				.catch((e) => {
					console.log(e);
					logger.error('note', 'failed to undo repeat');

					return res.status(500).json({
						message: locale.error.internalServer
					});
				});
		} else {
			logger.debug('note', 'repeat doesnt exist');
			await NoteService.create(
				auth.user,
				'',
				'',
				parsedBody.visibility,
				req.params.id
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
					logger.error('note', 'failed to create repeat');

					return res.status(500).json({
						message: locale.error.internalServer
					});
				});
		}
	}
);

export default router;
