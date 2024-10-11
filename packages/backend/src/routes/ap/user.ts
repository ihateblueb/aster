import express from 'express';
import { In } from 'typeorm';

import pkg from '../../../../../package.json' with { type: 'json' };
import ApActorRenderer from '../../services/ap/ApActorRenderer.js';
import UserService from '../../services/UserService.js';
import oapi from '../../utils/apidoc.js';
import config from '../../utils/config.js';
import db from '../../utils/database.js';

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
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res, next) => {
		if (!req.headers || !req.headers.accept || req.accepts('html'))
			return next();

		res.setHeader('Content-Type', 'application/activity+json');

		if (!req.params.id)
			return res.status(400).json({
				message: 'User not specified'
			});

		let user = await UserService.get({ id: req.params.id });

		if (user) {
			if (user.suspended) {
				return res.status(403).json({
					message: 'User suspended'
				});
			} else if (!user.activated) {
				return res.status(403).json({
					message: 'User not activated'
				});
			} else {
				return res.status(200).json(ApActorRenderer.render(user));
			}
		} else {
			return res.status(404).json({
				message: "User doesn't exist"
			});
		}
	}
);

export default router;
