import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ModeratedInstanceService from '../../../../../services/ModeratedInstanceService.js';
import SanitizerService from '../../../../../services/SanitizerService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		body: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					host: { type: 'string' },
					cw: { type: ['string', 'null'] },
					sensitive: { type: ['boolean', 'null'] },
					deliver: { type: ['boolean', 'null'] },
					accept: { type: ['boolean', 'null'] },
					fetch: { type: ['boolean', 'null'] },
					return: { type: ['boolean', 'null'] }
				}
			}
		}
	} as const;

	fastify.patch<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/admin/federation/rules',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			for (const instance of req.body) {
				await ModeratedInstanceService.update(
					SanitizerService.sanitize(instance.host),
					SanitizerService.sanitize(instance.cw),
					instance.sensitive ?? undefined,
					instance.deliver ?? undefined,
					instance.accept ?? undefined,
					instance.fetch ?? undefined,
					instance.return ?? undefined
				);
			}

			const instances = await ModeratedInstanceService.getMany();
			return reply.status(200).send(instances);
		}
	);
});
