import plugin from 'fastify-plugin';

export default plugin(async (fastify) => {
    const schema = {
        tags: ['Follow Requests']
    } as const;

    fastify.post(
        '/api/follow-requests/accept',
        {
            schema: schema
        },
        async (req, reply) => {
            // array body
            return reply.status(501).send();
        }
    );
});
