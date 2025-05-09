import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApActorRenderer from '../../../renderers/ap/ApActorRenderer.js';
import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation'],
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
		'/users/:id',
		{
			schema: schema
		},
		async (req, reply) => {
			const user = await UserService.get({ id: req.params.id });

			if (!user || !user.local || user.suspended || !user.activated)
				return reply.status(404).send();

			const rendered = ApActorRenderer.render(user);

			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(rendered);
		}
	);
});
