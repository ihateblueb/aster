import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ConfigService from '../../../../services/ConfigService.js';
import DriveService from '../../../../services/DriveService.js';
import SanitizerService from '../../../../services/SanitizerService.js';
import ValidationService from '../../../../services/ValidationService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Drive'],
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
				src: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.hard.url
				},
				alt: {
					type: ['string', 'null'],
					maxLength: ConfigService.limits.soft.alt
				},
				sensitive: { type: ['boolean', 'null'] }
			}
		}
	} as const;

	fastify.patch<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/drive/file/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const file = await DriveService.get({ id: req.params.id });

			if (!file) return reply.status(404).send();

			if (
				(!file.user || file.user.id !== req.auth.user.id) &&
				!req.auth.user.admin
			)
				return reply.status(403).send();

			let updated = {};

			if ('src' in req.body) {
				if (req.body.src) {
					if (ValidationService.validUrl(req.body.src)) {
						updated['src'] = SanitizerService.sanitize(
							req.body.src
						);
					} else {
						return reply.status(400).send({
							message: 'src url is invalid'
						});
					}
				} else {
					updated['src'] = null;
				}
			}

			if ('alt' in req.body) {
				if (req.body.alt) {
					updated['alt'] = SanitizerService.sanitize(req.body.alt);
				} else {
					updated['alt'] = null;
				}
			}

			if ('sensitive' in req.body) {
				updated['sensitive'] = !!req.body.sensitive;
			}

			updated['updatedAt'] = new Date().toISOString();

			// todo: if notes attach this image, rerender the note with the images and then send out an Update for it

			return await DriveService.update(
				{
					id: file.id
				},
				updated
			).then(async () => {
				return reply
					.status(200)
					.send(await DriveService.get({ id: file.id }));
			});
		}
	);
});
