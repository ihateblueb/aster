import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import VisibilityService from '../../../services/VisibilityService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/note/:id',
	oapi.path({
		description: 'Fetch a note',
		tags: ['Note'],
		responses: {
			200: {
				description: 'Return a note.',
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
		if (!req.params.id)
			return res.status(400).json({
				message: locale.note.notSpecified
			});

		const note = await NoteService.get({
			id: req.params.id
		});

		console.log(note);

		if (note) {
			if (!note.user) {
				res.status(404).json({
					message: locale.note.authorNotFound
				});
			} else {
				const auth = await AuthService.verify(
					req.headers.authorization
				);

				if (await VisibilityService.canISee(note, auth.user?.id)) {
					return res.status(200).json(note);
				} else {
					return res.status(404).json({
						message: locale.note.notFound
					});
				}
			}
		} else {
			return res.status(404).json({
				message: locale.note.notFound
			});
		}
	}
);

export default router;
