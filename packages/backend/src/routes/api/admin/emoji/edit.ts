import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ConfigService from '../../../../services/ConfigService.js';
import DriveService from '../../../../services/DriveService.js';
import EmojiService from '../../../../services/EmojiService.js';
import SanitizerService from '../../../../services/SanitizerService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
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
				shortcode: { type: 'string', nullable: true },
				category: { type: 'string', nullable: true },
				file: { type: 'string', nullable: true }
			}
		}
	} as const;

	fastify.patch<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
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

			let updated = {};

			if (req.body.shortcode && req.body.shortcode.length <= 500)
				updated['shortcode'] = SanitizerService.sanitize(
					req.body.shortcode
				);

			if (req.body.category && req.body.category.length <= 500)
				updated['category'] = SanitizerService.sanitize(
					req.body.category
				);

			if (req.body.file && req.body.file.length <= 500)
				updated['file'] = SanitizerService.sanitize(req.body.file);

			updated['updatedAt'] = new Date().toISOString();

			return await EmojiService.update(
				{
					id: emoji.id
				},
				updated
			).then(async () => {
				return reply
					.status(200)
					.send(await EmojiService.get({ id: emoji.id }));
			});
		}
	);
});
