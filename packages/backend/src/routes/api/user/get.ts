import express from 'express';

import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/user/:id',
	oapi.path({
		description: 'Fetch a user',
		tags: ['User'],
		responses: {
			200: {
				description: 'Return a user.',
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

		const user = await UserService.get({
			id: req.params.id
		});

		if (user) {
			if (user.suspended)
				return res.status(403).json({
					message: locale.user.suspended
				});
			if (!user.activated)
				return res.status(403).json({
					message: locale.user.notActivated
				});
			return res.status(200).json(user);
		} else {
			return res.status(404).json({
				message: locale.user.notFound
			});
		}
	}
);

export default router;
