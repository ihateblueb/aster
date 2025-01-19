import express from 'express';

import ApActorRenderer from '../../../services/ap/ApActorRenderer.js';
import ApDeliverService from '../../../services/ap/ApDeliverService.js';
import ApUpdateRenderer from '../../../services/ap/ApUpdateRenderer.js';
import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import MetaService from '../../../services/MetaService.js';
import SanitizerService from '../../../services/SanitizerService.js';
import UserService from '../../../services/UserService.js';
import ValidationService from '../../../services/ValidationService.js';
import oapi from '../../../utils/apidoc.js';
import bodyparser from '../../../utils/bodyparser.js';

const router = express.Router();

router.patch(
	'/api/meta',
	oapi.path({
		description: 'Update instance metadata',
		tags: ['Meta'],
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
				description: 'Return updated instance metadata.',
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
	bodyparser,
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		if (!auth.user.admin)
			return res.status(403).json({
				message: 'Must be admin'
			});

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		let updated = {};

		if (parsedBody.name)
			updated['name'] = SanitizerService.sanitize(parsedBody.name);

		if (parsedBody.description)
			updated['description'] = SanitizerService.sanitize(
				parsedBody.description
			);

		if (parsedBody.maintainer)
			updated['maintainer'] = SanitizerService.sanitize(
				parsedBody.maintainer
			);

		if (parsedBody.maintainerEmail)
			updated['maintainerEmail'] = SanitizerService.sanitize(
				parsedBody.maintainerEmail
			);

		return await MetaService.update(updated)
			.then(async () => {
				return res.status(200).send(await MetaService.get(true));
			})
			.catch(() => {
				return res
					.status(500)
					.send({ message: 'Internal server error' });
			});
	}
);

export default router;
