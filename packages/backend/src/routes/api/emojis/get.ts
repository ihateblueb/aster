import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { IsNull, LessThan } from 'typeorm';

import EmojiBuilder from '../../../services/builders/EmojiBuilder.js';
import ConfigService from '../../../services/ConfigService.js';
import EmojiService from '../../../services/EmojiService.js';
import TimelineService from '../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Emoji'],
		querystring: {
			type: 'object',
			properties: {
				remote: { type: 'string', nullable: true } // admin only
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

			return await EmojiService.getMany(where).then(async (e) => {
				if (e && e.length > 0)
					return reply
						.status(200)
						.send(await EmojiBuilder.categorize(e));
				return reply.status(204).send();
			});
		}
	);
});
