import express from 'express';

import AuthService from '../../../../services/AuthService.js';
import ReportService from '../../../../services/ReportService.js';
import oapi from '../../../../utils/apidoc.js';
import locale from '../../../../utils/locale.js';

const router = express.Router();

router.get(
	'/api/admin/report/:id',
	oapi.path({
		description: 'Fetch a report',
		tags: ['Admin'],
		responses: {
			200: {
				description: 'Return a report.',
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

		if (!auth.user && !auth.user.admin)
			return res.status(403).json({
				message: locale.auth.insufficientPermissions
			});

		const report = await ReportService.get({ id: req.params.id });

		if (!report)
			return res.status(404).json({
				message: 'Not found'
			});

		return res.status(200).json(report);
	}
);

export default router;
