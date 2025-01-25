import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { And, ArrayContains, In, LessThan, Not } from 'typeorm';

import ConfigService from '../../../services/ConfigService.js';
import RelationshipService from '../../../services/RelationshipService.js';
import TimelineService from '../../../services/TimelineService.js';

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
		'/api/timeline/home',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const following = await RelationshipService.getFollowing(
				req.auth.user.id
			);

			const followingIds: string[] = [req.auth.user.id];
			for (const user of following) {
				followingIds.push(user.to.id);
			}

			const blocking = await RelationshipService.getBlocking(
				req.auth.user.id
			);

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
				to: ArrayContains([req.auth.user.id])
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
				orWhere
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
