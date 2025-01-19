import express from 'express';

import AuthService from '../../../../services/AuthService.js';
import ConfigService from '../../../../services/ConfigService.js';
import DriveService from '../../../../services/DriveService.js';
import SanitizerService from '../../../../services/SanitizerService.js';
import ValidationService from '../../../../services/ValidationService.js';
import oapi from '../../../../utils/apidoc.js';
import bodyparser from '../../../../utils/bodyparser.js';
import locale from '../../../../utils/locale.js';

const router = express.Router();

router.delete(
	'/api/drive/file/:id',
	oapi.path({
		description: 'Delete a drive file',
		tags: ['Drive'],
		security: [{ auth: [] }],
		responses: {
			200: {
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
				message: locale.error.notSpecified
			});

		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const file = await DriveService.get({ id: req.params.id });

		if (!file)
			return res.status(404).json({
				message: 'Not found'
			});

		if ((!file.user || file.user.id !== auth.user.id) && !auth.user.admin)
			return res
				.status(403)
				.json({ message: 'You cannot delete this file' });

		return await DriveService.delete({
			id: file.id
		})
			.then(async () => {
				return res.status(200).json({ message: 'Deleted' });
			})
			.catch(() => {
				return res
					.status(500)
					.send({ message: 'Internal server error' });
			});
	}
);

export default router;
