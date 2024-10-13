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
					'application/json': {
						$ref: '#/components/schemas/User'
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
				message: locale.user.notSpecified
			});

		let user = await UserService.get({
			id: req.params.id
		});

		if (user) {
			if (user.suspended) {
				res.status(403).json({
					message: locale.user.suspended
				});
			} else if (!user.activated) {
				res.status(403).json({
					message: locale.user.notActivated
				});
			} else {
				res.status(200).json(user);
			}
		} else {
			res.status(404).json({
				message: locale.user.notFound
			});
		}
	}
);

export default router;
