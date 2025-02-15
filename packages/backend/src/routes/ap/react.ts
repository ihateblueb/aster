import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApEmojiReactRenderer from '../../services/ap/ApEmojiReactRenderer.js';
import ConfigService from '../../services/ConfigService.js';
import ReactionService from '../../services/ReactionService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		}
	} as const;

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/react/:id',
		{
			schema: schema
		},
		async (req, reply) => {
			const react = await ReactionService.get({ id: req.params.id });

			if (
				!react ||
				!react.user.local ||
				react.user.suspended ||
				!react.user.activated
			)
				return reply.status(404).send();

			const rendered = ApEmojiReactRenderer.render(
				new URL(ConfigService.url).href + 'react/' + req.params.id,
				react.user.id,
				react.note.apId,
				react.emoji
			);

			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(rendered);
		}
	);
});
