import express from 'express';

import authorizedFetch from '../../../middleware/authorizedFetch.js';
import ApActorRenderer from '../../../services/ap/ApActorRenderer.js';
import ApOrderedCollectionRenderer from '../../../services/ap/ApOrderedCollectionRenderer.js';
import CacheService from '../../../services/CacheService.js';
import ConfigService from '../../../services/ConfigService.js';
import LikeService from '../../../services/LikeService.js';
import MetricsService from '../../../services/MetricsService.js';
import NoteService from '../../../services/NoteService.js';
import UserService from '../../../services/UserService.js';
import oapi from '../../../utils/apidoc.js';
import locale from '../../../utils/locale.js';

const router = express.Router();

router.get(
	'/users/:id/outbox',
	oapi.path({
		description: "Fetch an actor's outbox",
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: "Return specified actor's outbox.",
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
				message: locale.user.notSpecified
			});

		/*
        if (ConfigService.cache.ap.enabled) {
            const cachedUserOutbox = await CacheService.get(
                'ap_user_outbox_' + req.params.id
            );

            if (cachedUserOutbox) {
                MetricsService.apUserCacheHits.inc(1);
                return res.status(200).json(JSON.parse(cachedUserOutbox));
            } else {
                MetricsService.apUserCacheMisses.inc(1);
            }
        }
        */

		const user = await UserService.get({ id: req.params.id });

		if (user) {
			if (!user.local)
				return res.status(404).json({
					message: locale.user.notFound
				});
			if (user.suspended)
				return res.status(403).json({
					message: locale.user.suspended
				});
			if (!user.activated)
				return res.status(403).json({
					message: locale.user.notActivated
				});

			let outbox: ApId[] = [];

			const lastNotes = await NoteService.getMany(
				{
					id: req.params.id,
					visibility: 'public'
				},
				ConfigService.timeline.maxObjects
			);

			for (const note of lastNotes) {
				outbox.push(note.apId);
			}

			const lastLikes = await LikeService.getMany(
				{
					user: { id: req.params.id }
				},
				ConfigService.timeline.maxObjects
			);

			for (const like of lastLikes) {
				outbox.push(like.apId);
			}

			/*
            if (ConfigService.cache.ap.enabled)
                await CacheService.set(
                    'ap_user_outbox_' + req.params.id,
                    JSON.stringify(rendered),
                    ConfigService.cache.ap.expiration
                );
            */

			// todo: once pagination is a thing, make the outbox not limited to last 45. this will allow full backfill of a user's notes and likes
			const rendered = await ApOrderedCollectionRenderer.render(
				req.params.id + '/outbox',
				outbox
			);

			return res.status(200).json(rendered);
		} else {
			return res.status(404).json({
				message: locale.user.notFound
			});
		}
	}
);

export default router;
