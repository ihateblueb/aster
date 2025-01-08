import express from 'express';

import AuthService from '../../../services/AuthService.js';
import SanitizerService from '../../../services/SanitizerService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.patch(
	['/api/user', '/api/user/:id'],
	oapi.path({
		description: 'Update a user',
		tags: ['User'],
		security: [{ auth: [] }],
		requestBody: {
			content: {
				'application/json': {
					type: 'object'
				}
			}
		},
		responses: {
			200: {
				description: 'Return an updated user.',
				content: {
					'application/json': {}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			413: { $ref: '#/components/responses/error-413' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		let user = req.params.id ?? auth.user.id;
		if (user !== auth.user.id && !auth.user.admin)
			return res
				.status(403)
				.json({ message: 'You cannot edit this user' });

		let updated;
		if (parsedBody.username)
			updated['username'] = SanitizerService.sanitize(
				parsedBody.username
			);

		return res.status(501).send();
	}
);

export default router;
