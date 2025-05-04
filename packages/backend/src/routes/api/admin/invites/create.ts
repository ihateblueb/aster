import plugin from 'fastify-plugin';

import InviteService from '../../../../services/InviteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin']
	} as const;

	fastify.post(
		'/api/admin/invite',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			if (!req.auth.user.admin) return reply.status(403).send();
			return await InviteService.create(req.auth.user.id).then((e) => {
				if (e.error)
					return reply.status(e.status).send({ message: e.message });
				return reply.status(200).send({ invite: e.invite });
			});
		}
	);
});
