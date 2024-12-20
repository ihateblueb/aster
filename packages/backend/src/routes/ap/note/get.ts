import express from 'express';

import ApNoteRenderer from '../../../services/ap/ApNoteRenderer.js';
import AuthorizedFetchService from '../../../services/AuthorizedFetchService.js';
import NoteService from '../../../services/NoteService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/notes/:id',
	oapi.path({
		description: 'Fetch a note',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: 'Return specified note.',
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
				message: locale.note.notSpecified
			});

		const note = await NoteService.get({ id: req.params.id });

		/*if (config.cache.ap) {
			const cachedNote = await CacheService.get(
				'ap_note_' + req.params.id
			);

			if (cachedNote) {
				MetricsService.apNoteCacheHits.inc(1);
				note = JSON.parse(cachedNote);
			} else {
				MetricsService.apNoteCacheMisses.inc(1);
			}
		}*/

		if (note) {
			if (!note.user.local) {
				return res.status(404).json({
					message: locale.user.notFound
				});
			} else if (note.user.suspended) {
				return res.status(403).json({
					message: locale.user.suspended
				});
			} else if (!note.user.activated) {
				return res.status(403).json({
					message: locale.user.notActivated
				});
			} else {
				const afs = await AuthorizedFetchService.try(req, note);

				if (afs.error)
					return res.status(afs.status).json({
						message: afs.message
					});

				const rendered = await ApNoteRenderer.render(note);

				/*if (config.cache.ap)
					await CacheService.set(
						'ap_note_' + req.params.id,
						JSON.stringify(rendered),
						Number(config.cache.apExpiration)
					);*/

				return res.status(200).json(rendered);
			}
		} else {
			return res.status(404).json({
				message: locale.note.notFound
			});
		}
	}
);

export default router;
