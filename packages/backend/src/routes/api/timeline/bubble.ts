import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { In, LessThan } from 'typeorm';

import ConfigService from '../../../services/ConfigService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import TimelineService from '../../../services/TimelineService.js';
import locale from '../../../utils/locale.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Timeline'],
		querystring: {
			type: 'object',
			properties: {
				since: { type: ['string', 'null'] },
				take: { type: 'number', nullable: true },
				reverse: { type: ['boolean', 'null'] },
				local: { type: ['boolean', 'null'] }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/timeline/bubble',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			if (!ConfigService.bubbleTimeline.enabled)
				return reply.status(409).send({
					message: locale.error.featureNotEnabled
				});

			const bubbleInstances = ConfigService.bubbleTimeline.instances;

			if (req.query.local)
				bubbleInstances.push(new URL(ConfigService.url).host);

			if (req.auth.user) {
				const blocking = await RelationshipService.getBlocking(
					req.auth.user.id
				);

				const blockingIds: string[] = [];
				for (const user of blocking) {
					blockingIds.push(user.to.id);
				}
			}

			let where = {
				user: { host: In(bubbleInstances) },
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
				undefined
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
