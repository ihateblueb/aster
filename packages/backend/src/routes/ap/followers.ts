import express from 'express';

import authorizedFetch from '../../middleware/authorizedFetch.js';
import ApOrderedCollectionRenderer from '../../services/ap/ApOrderedCollectionRenderer.js';
import CacheService from '../../services/CacheService.js';
import ConfigService from '../../services/ConfigService.js';
import MetricsService from '../../services/MetricsService.js';
import RelationshipService from '../../services/RelationshipService.js';
import UserService from '../../services/UserService.js';
import oapi from '../../utils/apidoc.js';
import locale from '../../utils/locale.js';

const router = express.Router();

router.get(
	'/users/:id/followers',
	oapi.path({
		description: "Fetch an actor's followers list",
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: "Return specified actor's followers list.",
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

		if (ConfigService.cache.ap) {
			const cachedUserFollowing = await CacheService.get(
				'ap_user_followers_' + req.params.id
			);

			if (cachedUserFollowing) {
				MetricsService.apUserCacheHits.inc(1);
				return res.status(200).json(JSON.parse(cachedUserFollowing));
			} else {
				MetricsService.apUserCacheMisses.inc(1);
			}
		}

		const user = await UserService.get({ id: req.params.id });

		if (user) {
			if (!user.local) {
				return res.status(404).json({
					message: locale.user.notFound
				});
			} else if (user.suspended) {
				return res.status(403).json({
					message: locale.user.suspended
				});
			} else if (!user.activated) {
				return res.status(403).json({
					message: locale.user.notActivated
				});
			} else {
				const items = await RelationshipService.getFollowers(
					req.params.id
				);

				let sortedItems: ApId[] = [];

				for (const item of items) {
					if (item.apId) sortedItems.push(item.apId);
				}

				const rendered = ApOrderedCollectionRenderer.render(
					'users/' + req.params.id + '/followers',
					sortedItems
				);

				if (ConfigService.cache.ap.enabled)
					await CacheService.set(
						'ap_user_followers_' + req.params.id,
						JSON.stringify(rendered),
						ConfigService.cache.ap.expiration
					);

				return res.status(200).json(rendered);
			}
		} else {
			return res.status(404).json({
				message: locale.user.notFound
			});
		}
	}
);

export default router;
