import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import config from '../../../utils/config.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.delete(
	'/api/note/:id',
	oapi.path({
		description: 'Delete a note',
		tags: ['Note'],
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

		if (!req.params.id)
			return res.status(400).json({
				message: locale.note.notSpecified
			});

		let note = await NoteService.get({ id: req.params.id });

		if (!note)
			return res.status(400).json({
				message: locale.note.notFound
			});

		let user = await UserService.get({ id: note.user.id });

		if (note.user.id !== auth.user && !user.admin)
			return res.status(400).json({
				message: locale.note.cannotDelete
			});

		return await NoteService.delete({ id: req.params.id })
			.then(() => {
				return res.status(200).json({
					message: locale.note.deleted
				});
			})
			.catch((err) => {
				console.log(err);
				logger.error('note', 'failed to delete note ' + req.params.id);
				return res.status(500).json({
					message: locale.error.internalServer
				});
			});
	}
);

export default router;
