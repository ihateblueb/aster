import express from 'express';

import ApActorService from '../../../services/ap/ApActorService.js';
import AuthService from '../../../services/AuthService.js';
import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.post(
	'/api/user/:id/refetch',
	bodyparser,
	oapi.path({
		description: 'Refetch a user from remote',
		tags: ['User'],
		security: [{ auth: [] }],
		responses: {
			200: {
				description: 'Return the refetched user.',
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

		if (!user)
			return res.status(404).json({
				message: locale.user.notFound
			});

		return await ApActorService.refetch(user.apId)
			.then((e) => {
				if (e) return res.status(200).json(e);
				return res.status(500).json({
					message: 'Internal server error'
				});
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					message: 'Internal server error'
				});
			});
	}
);

export default router;
