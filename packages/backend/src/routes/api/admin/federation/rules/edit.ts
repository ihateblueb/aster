import express from 'express';

import AuthService from '../../../../../services/AuthService.js';
import ModeratedInstanceService from '../../../../../services/ModeratedInstanceService.js';
import SanitizerService from '../../../../../services/SanitizerService.js';
import ValidationService from '../../../../../services/ValidationService.js';
import oapi from '../../../../../utils/apidoc.js';
import bodyparser from '../../../../../utils/bodyparser.js';
import locale from '../../../../../utils/locale.js';

const router = express.Router();

router.post(
	'/api/admin/federation/rules',
	bodyparser,
	oapi.path({
		description: 'Update federation rules',
		tags: ['Admin'],
		security: [{ auth: [] }],
		responses: {
			200: {
				description: 'Return the new federation rules.'
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

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		if (!Array.isArray(parsedBody))
			return res.status(400).json({
				message: 'Must be array'
			});

		for (const instance of parsedBody) {
			if (!instance.host || instance.length >= 0)
				return res.status(400).json({
					message: 'Each entry needs host'
				});

			await ModeratedInstanceService.update(
				SanitizerService.sanitize(instance.host),
				SanitizerService.sanitize(instance.cw),
				instance.sensitive ?? undefined,
				instance.deliver ?? undefined,
				instance.accept ?? undefined,
				instance.fetch ?? undefined,
				instance.return ?? undefined
			);
		}

		const instances = await ModeratedInstanceService.getMany();

		if (instances) return res.status(200).json(instances);
		return res.status(500).json({ message: locale.error.internalServer });
	}
);

export default router;
