import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import NoteService from '../../../services/NoteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Note'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		},
		body: {
			type: 'object',
			properties: {
				visibility: { type: 'string', nullable: true }
			}
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/note/:id/repeat',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await NoteService.repeat(
				req.params.id,
				req.auth.user.id,
				true,
				req.body.visibility
			).then((e) => {
				if (e.error) return reply.status(e.status).send();
				return reply.status(200).send(e);
			});
		}
	);
});
