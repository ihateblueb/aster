import express from 'express';
import { In, LessThan } from 'typeorm';

import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';
import config from '../../../utils/config.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.get(
	'/api/timeline/bubble',
	oapi.path({
		description:
			'Fetch a timeline of public notes from instances in the local bubble',
		tags: ['Timeline'],
		parameters: [
			{
				name: 'take',
				in: 'take'
			},
			{
				name: 'since',
				in: 'since'
			},
			{
				name: 'reverse',
				in: 'reverse'
			},
			{
				name: 'local',
				in: 'local'
			}
		],
		responses: {
			200: {
				description: 'Return a timeline.'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			409: { $ref: '#/components/responses/error-409' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		if (!config.bubbleTimeline)
			return res.status(409).json({
				message: locale.error.featureNotEnabled
			});

		let bubbleInstances = config.bubbleInstances;

		if (req.query.local === 'true')
			bubbleInstances.push(new URL(config.url).host);

		let where = {
			user: { host: In(bubbleInstances) },
			visibility: 'public'
		};

		let take;
		let orderDirection;

		if (req.query.since) where['createdAt'] = LessThan(req.query.since);
		if (req.query.take) take = Number(req.query.take);
		if (req.query.reverse === 'true') orderDirection = 'ASC';

		take =
			take <= config.timeline.maxNotes ? take : config.timeline.maxNotes;

		let timeline = await TimelineService.get(
			'note',
			where,
			take,
			'note.createdAt',
			orderDirection ? orderDirection : 'DESC'
		).catch((err) => {
			console.log(err);
			logger.error('timeline', 'failed to generate timeline');
			return res.status(500).json({
				message: locale.error.internalServer
			});
		});

		if (timeline) return res.status(200).json(timeline);
	}
);

export default router;
