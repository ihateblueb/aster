import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { LessThan } from 'typeorm';

import ConfigService from '../../../../services/ConfigService.js';
import TimelineService from '../../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		querystring: {
			type: 'object',
			properties: {
				since: { type: ['string', 'null'] },
				take: { type: 'number', nullable: true },
				reverse: { type: ['boolean', 'null'] }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/admin/users',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			let where = {
				local: true
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
				'user',
				where,
				take,
				'user.createdAt',
				orderDirection ? orderDirection : 'DESC',
				undefined,
				undefined
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
