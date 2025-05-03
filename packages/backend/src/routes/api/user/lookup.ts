import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { ObjectLiteral } from 'typeorm';

import UserRenderer from '../../../renderers/UserRenderer.js';
import UserService from '../../../services/UserService.js';
import WebfingerService from '../../../services/WebfingerService.js';

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

			let user: boolean | ObjectLiteral = await UserService.get(where);
			if (!user && splitHandle[2])
				user = await WebfingerService.lookup(
					`@${splitHandle[1]}@${splitHandle[2]}`
				);

			if (!user || !user.activated || user.suspended)
				return reply.status(404).send();

			return await UserRenderer.render(user);
		}
	);
});
