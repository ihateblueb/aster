import plugin from 'fastify-plugin';

import UserBuilder from '../../../services/builders/UserBuilder.js';
import UserService from '../../../services/UserService.js';

export default plugin(async (fastify) => {
	const opts = {
		schema: {
			params: {
				type: 'object',
				properties: {
					id: { type: 'string' }
				},
				required: ['id']
			}
		}
	};

	fastify.get('/api/user/:id/bite', opts, async (req, reply) => {
		let user = await UserService.get({
			id: req.params.id
		});

		if (!user || !user.activated || user.suspended)
			return reply.status(404).send();

		return;
	});
});
