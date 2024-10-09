import express from 'express';

import oapi from '../../../utils/apidoc.js';

import NoteService from '../../../services/NoteService.js';

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
				message: 'Note not specified'
			});

		let note = await NoteService.get({
			id: req.params.id
		});

		if (note) {
            res.status(200).json(note);
		} else {
			res.status(404).json({
				message: "Note doesn't exist"
			});
		}
	}
);

export default router;
