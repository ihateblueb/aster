import express from 'express';

import AuthService from '../../../services/AuthService.js';
import LikeService from '../../../services/LikeService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.post(
	'/api/note/:id/like',
	bodyparser,
	oapi.path({
		description: 'Like a note',
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
		if (!req.params.id)
			return res.status(400).json({
				message: locale.note.notSpecified
			});

		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		return await LikeService.create(req.params.id, auth.user.id, true)
			.then((e) => {
				return res.status(e.status).json({ message: e.message });
			})
			.catch(() => {
				return res.status(500).send();
			});
	}
);

export default router;
