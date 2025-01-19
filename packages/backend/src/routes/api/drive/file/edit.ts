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

router.patch(
	'/api/drive/file/:id',
	oapi.path({
		description: 'Edit a drive file',
		tags: ['Drive'],
		security: [{ auth: [] }],
		responses: {
			200: {
				description: 'Return a drive file.',
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
	bodyparser,
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

		const bodyValidation = ValidationService.validateApiBody(req.body);

		if (bodyValidation.error)
			return res.status(bodyValidation.status).json({
				message: bodyValidation.message
			});

		const parsedBody = bodyValidation.body;

		const file = await DriveService.get({ id: req.params.id });

		if (!file)
			return res.status(404).json({
				message: 'Not found'
			});

		if ((!file.user || file.user.id !== auth.user.id) && !auth.user.admin)
			return res
				.status(403)
				.json({ message: 'You cannot edit this file' });

		let updated = {};

		if (
			parsedBody.src &&
			parsedBody.src.length <= ConfigService.limits.hard.url
		)
			updated['src'] = SanitizerService.sanitize(parsedBody.src);

		if (
			parsedBody.alt &&
			parsedBody.alt.length <= ConfigService.limits.soft.alt
		)
			updated['alt'] = SanitizerService.sanitize(parsedBody.alt);

		if ('sensitive' in parsedBody) {
			if (parsedBody.sensitive) {
				updated['sensitive'] = true;
			} else {
				updated['sensitive'] = false;
			}
		}

		updated['updatedAt'] = new Date().toISOString();

		// todo: if notes attach this image, rerender the note with the images and then send out an Update for it

		return await DriveService.update(
			{
				id: file.id
			},
			updated
		)
			.then(async () => {
				const newFile = await DriveService.get({ id: file.id });
				return res.status(200).json(newFile);
			})
			.catch(() => {
				return res
					.status(500)
					.send({ message: 'Internal server error' });
			});
	}
);

export default router;
