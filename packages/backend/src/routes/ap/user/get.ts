import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ApActorRenderer from '../../../services/ap/ApActorRenderer.js';
import ApLikeRenderer from '../../../services/ap/ApLikeRenderer.js';
import ApNoteRenderer from '../../../services/ap/ApNoteRenderer.js';
import AuthorizedFetchService from '../../../services/AuthorizedFetchService.js';
import ConfigService from '../../../services/ConfigService.js';
import LikeService from '../../../services/LikeService.js';
import NoteService from '../../../services/NoteService.js';
import UserService from '../../../services/UserService.js';

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
		'/users/:id',
		{
			schema: schema
		},
		async (req, reply) => {
			const user = await UserService.get({ id: req.params.id });

			if (!user || !user.local || user.suspended || !user.activated)
				return reply.status(404).send();

			const rendered = ApActorRenderer.render(user);

			return reply
				.status(200)
				.header('Content-Type', 'application/activity+json')
				.send(rendered);
		}
	);
});
