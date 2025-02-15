import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

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
				shortcode: { type: ['string', 'null'], maxLength: 500 },
				category: { type: ['string', 'null'], maxLength: 500 },
				file: { type: ['string', 'null'], maxLength: 500 }
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

			if ('shortcode' in req.body) {
				if (req.body.shortcode) {
					updated['shortcode'] = SanitizerService.sanitize(
						req.body.shortcode
					);
				} else {
					updated['shortcode'] = null;
				}
			}

			if ('category' in req.body) {
				if (req.body.category) {
					updated['category'] = SanitizerService.sanitize(
						req.body.category
					);
				} else {
					updated['category'] = null;
				}
			}

			if ('file' in req.body) {
				if (req.body.file) {
					updated['file'] = SanitizerService.sanitize(req.body.file);
				} else {
					updated['file'] = null;
				}
			}

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
