import plugin from 'fastify-plugin';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Miscellaneous']
	} as const;

	fastify.get(
		'/ping',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(200).send({
				serverTime: new Date().toISOString()
			});
		}
	);
});
