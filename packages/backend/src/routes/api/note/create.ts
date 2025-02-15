import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import NoteService from '../../../services/NoteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Note'],
		body: {
			type: 'object',
			properties: {
				cw: { type: ['string', 'null'] },
				content: { type: ['string', 'null'] },
				visibility: { type: ['string', 'null'] },
				repeat: { type: ['string', 'null'] },
				replyingTo: { type: ['string', 'null'] },
				attachments: {
					type: 'array',
					nullable: true,
					items: { type: 'string' }
				}
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/note',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return await NoteService.create(
				req.auth.user.id,
				req.body.cw,
				req.body.content,
				req.body.visibility,
				req.body.repeat,
				req.body.replyingTo,
				req.body.attachments
			).then(async (e) => {
				if (e.error)
					return reply.status(e.status).send({
						message: e.message
					});
				return reply.status(201).send(e?.note);
			});
		}
	);
});
