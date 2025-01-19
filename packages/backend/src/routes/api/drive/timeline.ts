import express from 'express';
import { LessThan } from 'typeorm';

import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.get(
	'/api/drive',
	oapi.path({
		description: 'Fetch a timeline of all files in drive',
		tags: ['Drive'],
		security: [{ auth: [] }],
		responses: {
			200: {
				description: 'Return a timeline of files.'
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

		const where = {
			user: { id: auth.user.id }
		};

		let take;
		let orderDirection;

		if (req.query.since) where['createdAt'] = LessThan(req.query.since);
		if (req.query.take) take = Number(req.query.take);
		if (req.query.reverse === 'true') orderDirection = 'ASC';

		take =
			take <= ConfigService.timeline.maxObjects
				? take
				: ConfigService.timeline.maxObjects;

		return await TimelineService.get(
			'drive',
			where,
			take,
			'drive_file.createdAt',
			orderDirection ? orderDirection : 'DESC'
		)
			.then((e) => {
				if (e && e.length > 0) return res.status(200).json(e);
				return res.status(204).send();
			})
			.catch((err) => {
				console.log(err);
				logger.error('timeline', 'failed to generate timeline');
				return res.status(500).json({
					message: locale.error.internalServer
				});
			});
	}
);

export default router;
