import express from 'express';
import { And, ArrayContains, In, LessThan, Not } from 'typeorm';

import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.get(
	'/api/timeline/home',
	oapi.path({
		description:
			'Fetch a timeline of all notes visible to the authenticated user',
		tags: ['Timeline'],
		parameters: [
			{ $ref: '#/components/parameters/take' },
			{ $ref: '#/components/parameters/since' },
			{ $ref: '#/components/parameters/reverse' }
		],
		security: [{ auth: [] }],
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

		const following = await RelationshipService.getFollowing(auth.user.id);

		const followingIds: string[] = [auth.user.id];
		for (const user of following) {
			followingIds.push(user.to.id);
		}

		const blocking = await RelationshipService.getBlocking(auth.user.id);

		const blockingIds: string[] = [];
		for (const user of blocking) {
			blockingIds.push(user.to.id);
		}

		// todo: and where Not(blockingIds + mutingIds)
		let where = {
			user: { id: And(In(followingIds), Not(In(blockingIds))) },
			visibility: In(['public', 'unlisted', 'followers'])
		};
		let orWhere = {
			to: ArrayContains([auth.user.id])
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
			'note',
			where,
			take,
			'note.createdAt',
			orderDirection ? orderDirection : 'DESC',
			orWhere
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
