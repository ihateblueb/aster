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

router.post(
	'/api/note/:id/like',
	oapi.path({
		description: 'Like a note',
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

		return await NoteService.like(req.params.id, auth.user)
			.then((e) => {
				return res.status(e.status).json({ message: e.message });
			})
			.catch(() => {
				return res.status(500).send();
			});
	}
);

export default router;
