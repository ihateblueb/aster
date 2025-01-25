import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ConfigService from '../../../../services/ConfigService.js';
import DriveService from '../../../../services/DriveService.js';
import SanitizerService from '../../../../services/SanitizerService.js';

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
				src: { type: 'string', nullable: true },
				alt: { type: 'string', nullable: true },
				sensitive: { type: 'boolean', nullable: true }
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

			if (
				req.body.src &&
				req.body.src.length <= ConfigService.limits.hard.url
			)
				updated['src'] = SanitizerService.sanitize(req.body.src);

			if (
				req.body.alt &&
				req.body.alt.length <= ConfigService.limits.soft.alt
			)
				updated['alt'] = SanitizerService.sanitize(req.body.alt);

			if ('sensitive' in req.body) {
				if (req.body.sensitive) {
					updated['sensitive'] = true;
				} else {
					updated['sensitive'] = false;
				}
			}

			updated['updatedAt'] = new Date().toISOString();

			// todo: if notes attach this image, rerender the note with the images and then send out an Update for it

			return await DriveService.update(
				{
					id: file.id
				},
				updated
			).then(async () => {
				const newFile = await DriveService.get({ id: file.id });
				return reply.status(200).send(newFile);
			});
		}
	);
});
