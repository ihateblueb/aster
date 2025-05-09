import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ContextRenderer from '../../../renderers/ContextRenderer.js';
import NoteService from '../../../services/NoteService.js';
import VisibilityService from '../../../services/VisibilityService.js';

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

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/note/:id/context',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.optionalAuth])
		},
		async (req, reply) => {
			const note = await NoteService.get({ id: req.params.id });

			if (
				!note ||
				!note.user ||
				!note.user.activated ||
				note.user.suspended
			)
				return reply.status(404).send();

			let canISee = await VisibilityService.canISee(
				note,
				req.auth.user?.id
			);

			if (
				(note.visibility === 'followers' ||
					note.visibility === 'direct') &&
				!canISee
			)
				return reply.status(404).send();

			return await ContextRenderer.render(note.id, 0, req.auth.user?.id);
		}
	);
});
