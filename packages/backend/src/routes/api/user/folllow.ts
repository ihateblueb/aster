import express from 'express';

import AuthService from '../../../services/AuthService.js';
import NoteService from '../../../services/NoteService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.post(
	'/api/user/:id/follow',
	oapi.path({
		description: 'Follow a user',
		tags: ['User'],
		responses: {
			200: {
				description:
					'Return the relationship for a user after trying to follow them.',
				content: {
					'application/json': {
						$ref: '#/components/schemas/User'
					}
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
		if (!req.params.id)
			return res.status(400).json({
				message: locale.user.notSpecified
			});

		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		return await UserService.follow(req.params.id, auth.user.id, true)
			.then((e) => {
				return res.status(e.status).json({ message: e.message });
			})
			.catch(() => {
				return res.status(500).send();
			});
	}
);

export default router;
