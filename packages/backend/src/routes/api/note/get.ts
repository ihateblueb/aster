import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import NoteRenderer from '../../../services/NoteRenderer.js';
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
		'/api/note/:id',
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

			// todo: test
			if (note.replyingTo) {
				let canISeeReply = await VisibilityService.canISee(
					note.replyingTo,
					req.auth.user?.id
				);

				if (!canISeeReply) note.replyingTo = undefined;
			}

			if (note.repeat) {
				let canISeeRepeat = await VisibilityService.canISee(
					note.repeat,
					req.auth.user?.id
				);

				if (!canISeeRepeat) note.repeat = undefined;
			}

			return await NoteRenderer.render(note);
		}
	);
});
