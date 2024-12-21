import express from 'express';

import ApLikeRenderer from '../../services/ap/ApLikeRenderer.js';
import oapi from '../../utils/apidoc.js';
import authorizedFetch from '../../utils/authorizedFetch.js';
import config from '../../utils/config.js';
import db from '../../utils/database.js';
import locale from '../../utils/locale.js';

const router = express.Router();

router.get(
	'/like/:id',
	oapi.path({
		description: 'Fetch a like',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: 'Return specified like.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	await authorizedFetch,
	async (req, res, next) => {
		if (
			!req.headers ||
			!req.headers.accept ||
			(!req.headers.accept.includes('application/activity+json') &&
				!req.headers.accept.includes('application/ld+json'))
		)
			return next();

		res.setHeader('Content-Type', 'application/activity+json');

		if (!req.params.id)
			return res.status(400).json({
				message: 'Like not specified'
			});

		const like = await db
			.getRepository('note_like')
			.createQueryBuilder('note_like')
			.leftJoinAndSelect('note_like.user', 'user')
			.leftJoinAndSelect('note_like.note', 'note')
			.getOne();

		if (like) {
			if (!like.user.local) {
				return res.status(404).json({
					message: locale.user.notFound
				});
			} else if (like.user.suspended) {
				return res.status(403).json({
					message: locale.user.suspended
				});
			} else if (!like.user.activated) {
				return res.status(403).json({
					message: locale.user.notActivated
				});
			} else {
				const rendered = ApLikeRenderer.render(
					new URL(config.url).href + 'like/' + req.params.id,
					like.user.id,
					like.note.apId
				);

				return res.status(200).json(rendered);
			}
		} else {
			return res.status(404).json({
				message: 'Like not found'
			});
		}
	}
);

export default router;
