import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { In, LessThan, Not } from 'typeorm';

import AuthService from '../../../services/AuthService.js';
import ConfigService from '../../../services/ConfigService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import TimelineService from '../../../services/TimelineService.js';
import locale from '../../../utils/locale.js';
import logger from '../../../utils/logger.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Timeline'],
		querystring: {
			type: 'object',
			properties: {
				since: { type: 'string', nullable: true },
				take: { type: 'number', nullable: true },
				reverse: { type: 'boolean', nullable: true }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/timeline/local',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			const blocking = await RelationshipService.getBlocking(
				req.auth.user.id
			);

			const blockingIds: string[] = [];
			for (const user of blocking) {
				blockingIds.push(user.to.id);
			}

			let andWhere;
			andWhere = {
				user: { id: Not(blockingIds) }
			};

			let where = {
				user: { local: true },
				visibility: 'public'
			};

			let take;
			let orderDirection;

			if (req.query.since) where['createdAt'] = LessThan(req.query.since);
			if (req.query.take) take = req.query.take;
			if (req.query.reverse) orderDirection = 'ASC';

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
				undefined,
				andWhere
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
