import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

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

		return res.status(501).send();

		return await NoteService.like(req.params.id, auth.user, true)
			.then((e) => {
				return res.status(e.status).json({ message: e.message });
			})
			.catch(() => {
				return res.status(500).send();
			});
	}
);

export default router;
