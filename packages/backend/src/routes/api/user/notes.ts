import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { In, IsNull, LessThan } from 'typeorm';

import ConfigService from '../../../services/ConfigService.js';
import TimelineService from '../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		},
		querystring: {
			type: 'object',
			properties: {
				since: { type: ['string', 'null'] },
				take: { type: 'number', nullable: true },
				reverse: { type: ['boolean', 'null'] },
				// todo: replies && withAttachments
				replies: { type: ['boolean', 'null'] },
				withAttachments: { type: ['boolean', 'null'] }
			}
		}
	} as const;

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/user/:id/notes',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			let where = {
				user: { id: req.params.id },
				replyingTo: IsNull(),
				visibility: In(['public', 'unlisted'])
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
				orderDirection ? orderDirection : 'DESC'
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
