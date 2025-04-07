import plugin from 'fastify-plugin';

export default plugin(async (fastify) => {
    const schema = {
        tags: ['Follow Requests']
    } as const;

    fastify.post(
        '/api/follow-requests',
        {
            schema: schema
        },
        async (req, reply) => {
            return reply.status(501).send();
        }
    );
});
