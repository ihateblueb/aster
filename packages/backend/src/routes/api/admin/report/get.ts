import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ReportService from '../../../../services/ReportService.js';

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

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/report/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();

			const report = await ReportService.get({ id: req.params.id });

			if (!report) return reply.status(404).send();

			return reply.status(200).send(report);
		}
	);
});
