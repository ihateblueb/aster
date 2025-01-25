import plugin from 'fastify-plugin';

import NodeinfoService from '../../../services/NodeinfoService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation']
	} as const;

	fastify.get(
		'/nodeinfo/2.0',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(await NodeinfoService.render('2.0'));
		}
	);
});
