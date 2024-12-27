import express from 'express';

import AuthService from '../../../services/AuthService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/user/:id/relationship',
	oapi.path({
		description: 'Fetch the relationship between you and a user.',
		tags: ['User'],
		security: [{ auth: [] }],
		responses: {
			200: {
				description: 'Return the relationship between you and a user.',
				content: {
					'application/json': {}
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
				message: locale.user.notSpecified
			});

		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const user = await UserService.get({ id: req.params.id });

		if (user) {
			if (user.suspended)
				return res.status(403).json({
					message: locale.user.suspended
				});
			if (!user.activated)
				return res.status(403).json({
					message: locale.user.notActivated
				});

			const relationshipTo = await RelationshipService.get({
				to: { id: auth.user.id },
				from: { id: req.params.id }
			});
			const relationshipFrom = await RelationshipService.get({
				to: { id: req.params.id },
				from: { id: auth.user.id }
			});

			return res.status(200).json({
				to: relationshipTo,
				from: relationshipFrom
			});
		} else {
			return res.status(404).json({
				message: locale.user.notFound
			});
		}
	}
);

export default router;
