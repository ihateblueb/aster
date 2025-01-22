import plugin from 'fastify-plugin';

import UserBuilder from '../../../services/builders/UserBuilder.js';
import UserService from '../../../services/UserService.js';
import locale from '../../../utils/locale.js';

export default plugin(async (fastify) => {
	const opts = {
		schema: {
			params: {
				type: 'object',
				properties: {
					handle: { type: 'string' }
				},
				required: ['handle']
			}
		}
	};

	fastify.get('/api/lookup/:handle', opts, async (req, reply) => {
		const splitHandle = req.params.handle.split('@');

		let where = {
			username: splitHandle[1]
		};

		if (splitHandle[2]) where['host'] = splitHandle[2];
		if (!splitHandle[2]) where['local'] = true;

		const user = await UserService.get(where);

		if (!user || !user.activated || user.suspended)
			return reply.status(404).send();

		return await UserBuilder.build(user);
	});
});
