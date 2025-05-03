import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApAnnounceRenderer from '../../../renderers/ap/ApAnnounceRenderer.js';
import ApCreateRenderer from '../../../renderers/ap/ApCreateRenderer.js';
import ApNoteRenderer from '../../../renderers/ap/ApNoteRenderer.js';
import AuthorizedFetchService from '../../../services/AuthorizedFetchService.js';
import NoteService from '../../../services/NoteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation'],
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
		'/notes/:id/activity',
		{
			schema: schema
		},
		async (req, reply) => {
			const note = await NoteService.get({ id: req.params.id });

			if (
				!note ||
				!note.user.local ||
				note.user.suspended ||
				!note.user.activated
			)
				return reply.status(404).send();

			const afs = await AuthorizedFetchService.try(req, note);

			if (afs.error)
				return reply.status(afs.status).send({
					message: afs.message
				});

			let rendered: ApObject;
			if (note.repeat && !note.content) {
				rendered = await ApAnnounceRenderer.render(
					note,
					note.repeat.local
						? await ApNoteRenderer.render(note.repeat)
						: note.repeat.apId
				);
			} else {
				rendered = ApCreateRenderer.render(
					await ApNoteRenderer.render(note)
				);
			}

			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(rendered);
		}
	);
});
