import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { ArrayContains, LessThan } from 'typeorm';

import ConfigService from '../../../services/ConfigService.js';
import TimelineService from '../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Notifications'],
		querystring: {
			type: 'object',
			properties: {
				since: { type: 'string', nullable: true },
				take: { type: 'number', nullable: true },
				reverse: { type: 'boolean', nullable: true },
				mentions: { type: 'boolean', nullable: true },
				direct: { type: 'boolean', nullable: true }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/notifications',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			let where = {
				to: { id: req.auth.user.id }
			};

			let take;
			let orderDirection;

			if (req.query.since) where['createdAt'] = LessThan(req.query.since);
			if (req.query.take) take = req.query.take;
			if (req.query.reverse) orderDirection = 'ASC';

			if (req.query.mentions) where['type'] = 'mention';
			if (req.query.direct)
				where['note'] = {
					visibility: 'direct',
					to: ArrayContains([req.auth.user.id])
				};

			console.log(where);

			take =
				take <= ConfigService.timeline.maxObjects
					? take
					: ConfigService.timeline.maxObjects;

			return await TimelineService.get(
				'notification',
				where,
				take,
				'notification.createdAt',
				orderDirection ? orderDirection : 'DESC'
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
