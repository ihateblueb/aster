import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApValidationService from '../../services/ap/ApValidationService.js';
import IdService from '../../services/IdService.js';
import QueueService from '../../services/QueueService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation'],
		body: {
			type: 'object',
			properties: {
				type: { type: 'string' }
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/inbox',
		{
			schema: schema
		},
		async (req, reply) => {
			if (!ApValidationService.validBody(req.body))
				return reply.status(400).send();

			const apvs = await ApValidationService.validSignature(
				req,
				String(req.body.type)
			);

			if (apvs.pretendToProcess) return reply.status(202).send();
			if (apvs.blocked) return reply.status(403).send();
			if (!apvs.valid) return reply.status(401).send();

			if (apvs.valid)
				return await QueueService.inbox
					.add(
						(req.body.type.toLowerCase() ?? 'unknown') +
							'::' +
							IdService.generate(),
						req.body
					)
					.then(() => {
						return reply.status(202).send();
					});
		}
	);
});
