import express from 'express';
import { In } from 'typeorm';

import oapi from '../../utils/apidoc.js';
import db from '../../utils/database.js';
import config from '../../utils/config.js';

import pkg from '../../../../../package.json' with { type: 'json' };
import ApActorRenderer from '../../services/ap/ApActorRenderer.js';
import UserService from '../../services/UserService.js';

const router = express.Router();

router.get(
	'/user/:id',
	oapi.path({
		description: 'Fetch an actor',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return specified actor.'
			},
			401: { $ref: '#/components/responses/error-401' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res, next) => {
		if (
			req.headers['Accept'] !== 'application/ld+json' ||
			req.headers['Accept'] !== 'application/activity+json'
		)
			next();
		res.setHeader('Content-Type', 'application/ld+json');

		if (!req.params.id)
			return res.status(400).json({
				message: 'User not specified'
			});

		let user = await UserService.get({ apId: req.params.id });

		if (user) {
			if (user.suspended) {
				res.status(403).json({
					message: 'User suspended'
				});
			} else if (!user.activated) {
				res.status(403).json({
					message: 'User not activated'
				});
			} else {
				res.status(200).json(ApActorRenderer.render(user));
			}
		} else {
			res.status(404).json({
				message: "User doesn't exist"
			});
		}
	}
);

export default router;
