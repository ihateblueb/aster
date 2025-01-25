import plugin from 'fastify-plugin';

import MetaService from '../services/MetaService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Miscellaneous']
	} as const;

	fastify.get(
		'/manifest.json',
		{
			schema: schema
		},
		async (req, reply) => {
			let meta = await MetaService.get();
			return reply.status(200).send({
				name: meta.name,
				description: meta.description,
				display: 'standalone',
				prefer_related_applications: false,
				background_color: '#140e1b',
				theme_color: '#140e1b'
			});
		}
	);
});
