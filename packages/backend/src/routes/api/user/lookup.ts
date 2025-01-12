import express from 'express';

import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/user/lookup/:handle',
	oapi.path({
		description: 'Fetch a user by handle',
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
		if (!req.params.handle)
			return res.status(400).json({
				message: locale.user.notSpecified
			});

		const splitHandle = req.params.handle.split('@');

		let where = {
			username: splitHandle[1]
		};

		if (splitHandle[2]) where['host'] = splitHandle[2];
		if (!splitHandle[2]) where['local'] = true;

		const user = await UserService.get(where);

		if ((user && (!user.activated || user.suspended)) || !user)
			return res.status(404).json({
				message: locale.user.notFound
			});

		return res.status(200).json(user);
	}
);

export default router;
