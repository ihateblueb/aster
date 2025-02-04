import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { IsNull, LessThan } from 'typeorm';

import ConfigService from '../../../services/ConfigService.js';
import EmojiService from '../../../services/EmojiService.js';
import TimelineService from '../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Emoji'],
		querystring: {
			type: 'object',
			properties: {
				remote: { type: 'string', nullable: true }, // admin only
				since: { type: 'string', nullable: true },
				take: { type: 'number', nullable: true },
				reverse: { type: 'boolean', nullable: true }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/emojis',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			let where: where = {
				host: IsNull()
			};

			if (req.auth.user && req.auth.user.admin && req.query.remote)
				where = {};

			let take;
			let orderDirection;

			if (req.query.since) where['createdAt'] = LessThan(req.query.since);
			if (req.query.take) take = Number(req.query.take);
			if (req.query.reverse) orderDirection = 'ASC';

			take =
				take <= ConfigService.timeline.maxObjects
					? take
					: ConfigService.timeline.maxObjects;

			return await TimelineService.get(
				'emoji',
				where,
				take,
				'emoji.createdAt',
				orderDirection ? orderDirection : 'DESC'
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
