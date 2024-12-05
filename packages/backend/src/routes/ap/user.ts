import express from 'express';

import ApActorRenderer from '../../services/ap/ApActorRenderer.js';
import CacheService from '../../services/CacheService.js';
import MetricsService from '../../services/MetricsService.js';
import UserService from '../../services/UserService.js';
import oapi from '../../utils/apidoc.js';
import config from '../../utils/config.js';
import locale from '../../utils/locale.js';

const router = express.Router();

router.get(
	'/users/:id',
	oapi.path({
		description: 'Fetch an actor',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: 'Return specified actor.',
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
				message: 'User not specified'
			});

		if (config.cache.ap) {
			const cachedUser = await CacheService.get(
				'ap_user_' + req.params.id
			);

			if (cachedUser) {
				MetricsService.apUserCacheHits.inc(1);
				return res.status(200).json(JSON.parse(cachedUser));
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
				const rendered = ApActorRenderer.render(user);

				if (config.cache.ap)
					await CacheService.set(
						'ap_user_' + req.params.id,
						JSON.stringify(rendered),
						Number(config.cache.apExpiration)
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
