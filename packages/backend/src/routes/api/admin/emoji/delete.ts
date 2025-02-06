import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import DriveService from '../../../../services/DriveService.js';
import EmojiService from '../../../../services/EmojiService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		}
	} as const;

	fastify.delete<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/admin/emoji/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			const emoji = await EmojiService.get({ id: req.params.id });

			if (!emoji) return reply.status(404).send();

			return await EmojiService.delete({
				id: emoji.id
			}).then(async () => {
				return reply.status(200).send();
			});
		}
	);
});
