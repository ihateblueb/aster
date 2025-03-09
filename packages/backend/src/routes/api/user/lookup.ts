import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import UserRenderer from '../../../services/UserRenderer.js';
import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				handle: { type: 'string' }
			},
			required: ['handle']
		}
	} as const;

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/user/lookup/:handle',
		{
			schema: schema
		},
		async (req, reply) => {
			const splitHandle = req.params.handle.split('@');

			let where = {
				username: splitHandle[1]
			};

			if (splitHandle[2]) where['host'] = splitHandle[2];
			if (!splitHandle[2]) where['local'] = true;

			const user = await UserService.get(where);

			if (!user || !user.activated || user.suspended)
				return reply.status(404).send();

			return await UserRenderer.render(user);
		}
	);
});
