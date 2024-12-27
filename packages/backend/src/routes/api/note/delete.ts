import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.delete(
	'/api/note/:id',
	oapi.path({
		description: 'Delete a note',
		tags: ['Note'],
		security: [{ auth: [] }],
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
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		if (!req.params.id)
			return res.status(400).json({
				message: locale.note.notSpecified
			});

		const note = await NoteService.get({ id: req.params.id });

		if (!note)
			return res.status(400).json({
				message: locale.note.notFound
			});

		if (note.user.id !== auth.user.id && !auth.user.admin)
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
