import express from 'express';

import AuthService from '../../../../../services/AuthService.js';
import ModeratedInstanceService from '../../../../../services/ModeratedInstanceService.js';
import oapi from '../../../../../utils/apidoc.js';
import locale from '../../../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/admin/federation/rules',
	oapi.path({
		description: 'Get federation rules',
		tags: ['Admin'],
		responses: {
			200: {
				description: 'Return federation rules.'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		if (!auth.user && !auth.user.admin)
			return res.status(403).json({
				message: locale.auth.insufficientPermissions
			});

		const instances = await ModeratedInstanceService.getMany();

		if (instances) return res.status(200).json(instances);
		return res.status(500).json({ message: locale.error.internalServer });
	}
);

export default router;
