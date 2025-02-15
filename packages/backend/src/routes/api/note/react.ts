import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { IsNull } from 'typeorm';

import EmojiService from '../../../services/EmojiService.js';
import ReactionService from '../../../services/ReactionService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Note'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		},
		body: {
			type: 'object',
			properties: {
				emoji: { type: ['string', 'null'] }
			}
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/note/:id/react',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const emoji = await EmojiService.get({
				shortcode: req.body.emoji,
				host: IsNull()
			});

			return await ReactionService.create(
				req.params.id,
				emoji?.id,
				emoji ? undefined : req.body.emoji,
				req.auth.user.id,
				true
			).then((e) => {
				return reply.status(e.status).send({ message: e.message });
			});
		}
	);
});
