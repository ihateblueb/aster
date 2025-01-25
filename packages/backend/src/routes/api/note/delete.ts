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
		}
	} as const;

	fastify.delete<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/note/:id',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const note = await NoteService.get({ id: req.params.id });

			if (!note) return reply.status(404).send();

			if (note.user.id !== req.auth.user.id && !req.auth.user.admin)
				return reply.status(403).send();

			return await NoteService.delete({ id: req.params.id }).then(() => {
				return reply.status(200).send();
			});
		}
	);
});
