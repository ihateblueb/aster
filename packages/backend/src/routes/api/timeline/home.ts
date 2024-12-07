import express from 'express';
import { ArrayContains, In, LessThan } from 'typeorm';

import AuthService from '../../../services/AuthService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';
import config from '../../../utils/config.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.get(
	'/api/timeline/home',
	oapi.path({
		description:
			'Fetch a timeline of all notes visible to the authenticated user',
		tags: ['Timeline'],
		responses: {
			200: {
				description: 'Return a timeline.'
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

		const followingIds = await RelationshipService.getFollowing(auth.user);

		// to get notes from self also
		followingIds.push(auth.user);

		const where = {
			user: { id: In(followingIds) },
			visibility: In(['public', 'unlisted', 'followers'])
		};
		const orWhere = {
			to: ArrayContains([auth.user])
		};

		let take;
		let orderDirection;

		if (req.query.since) where['createdAt'] = LessThan(req.query.since);
		if (req.query.take) take = Number(req.query.take);
		if (req.query.reverse === 'true') orderDirection = 'ASC';

		take =
			take <= config.timeline.maxNotes ? take : config.timeline.maxNotes;

		return await TimelineService.get(
			'note',
			where,
			take,
			'note.createdAt',
			orderDirection ? orderDirection : 'DESC',
			orWhere
		)
			.then((e) => {
				if (e) return res.status(200).json(e);
				return res.status(500).json({
					message: locale.error.internalServer
				});
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
