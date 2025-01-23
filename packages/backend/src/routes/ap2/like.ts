import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApLikeRenderer from '../../services/ap/ApLikeRenderer.js';
import ConfigService from '../../services/ConfigService.js';
import LikeService from '../../services/LikeService.js';

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
		'/like/:id',
		{
			schema: schema
		},
		async (req, reply) => {
			const like = await LikeService.get({ id: req.params.id });

			if (
				!like ||
				!like.user.local ||
				like.user.suspended ||
				!like.user.activated
			)
				return reply.status(404).send();

			const rendered = ApLikeRenderer.render(
				new URL(ConfigService.url).href + 'like/' + req.params.id,
				like.user.id,
				like.note.apId
			);

			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(rendered);
		}
	);
});
