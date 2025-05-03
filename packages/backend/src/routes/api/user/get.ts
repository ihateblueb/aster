import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import UserRenderer from '../../../renderers/UserRenderer.js';
import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
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
		'/api/user/:id',
		{
			schema: schema
		},
		async (req, reply) => {
			let user = await UserService.get({
				id: req.params.id
			});

			if (!user || !user.activated || user.suspended)
				return reply.status(404).send();

			return reply.status(200).send(await UserRenderer.render(user));
		}
	);
});
