import express from 'express';
import oapi from '../../../utils/apidoc.js';
import NoteService from '../../../services/NoteService.js';
import AuthService from '../../../services/AuthService.js';
import ApiRequestValidationService from '../../../services/ApiRequestValidationService.js';

const router = express.Router();

router.post(
	'/api/note',
	oapi.path({
		description: 'Create a note',
		tags: ['Note'],
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
        let auth = await AuthService.verify(req.headers.authorization);

        if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		let bodyValidation = ApiRequestValidationService.validateBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		let parsedBody = bodyValidation.body;

        res.status(501);
	}
);

export default router;
