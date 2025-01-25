import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import NotificationService from '../../../services/NotificationService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Notifications'],
		body: {
			type: 'array',
			items: {
				type: 'string'
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/notifications/read',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			for (const notification of req.body) {
				await NotificationService.read(notification);
			}
			return reply.status(200).send();
		}
	);
});
