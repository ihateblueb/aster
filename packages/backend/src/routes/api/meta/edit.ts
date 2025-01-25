import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import MetaService from '../../../services/MetaService.js';
import SanitizerService from '../../../services/SanitizerService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Meta'],
		body: {
			type: 'object',
			properties: {
				name: { type: 'string', nullable: true },
				description: { type: 'string', nullable: true },
				maintainer: { type: 'string', nullable: true },
				maintainerEmail: { type: 'string', nullable: true }
			}
		}
	} as const;

	fastify.patch<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/meta',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			let updated = {};

			if (req.body.name)
				updated['name'] = SanitizerService.sanitize(req.body.name);

			if (req.body.description)
				updated['description'] = SanitizerService.sanitize(
					req.body.description
				);

			if (req.body.maintainer)
				updated['maintainer'] = SanitizerService.sanitize(
					req.body.maintainer
				);

			return await MetaService.update(updated).then(async () => {
				return reply.status(200).send(await MetaService.get(true));
			});
		}
	);
});
