import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import DriveService from '../../../../services/DriveService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Drive'],
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

			return reply.status(200).send(file);
		}
	);
});
