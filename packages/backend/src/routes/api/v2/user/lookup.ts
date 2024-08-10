import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';
import getRemoteActor from '../../../../utils/ap/getRemoteActor.js';
import getWebfingerAcct from '../../../../utils/ap/getWebfingerAcct.js';
import config from '../../../../utils/config.js';
import db from '../../../../utils/database.js';

const router = express.Router();

router.get('/api/v2/lookup/@:username', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.username) {
		return res.status(400).json({
			message: 'Username parameter required'
		});
	} else {
		let splitUsername = [];
		splitUsername = req.params.username.split('@');

		if (!splitUsername[0]) {
			splitUsername[0] = 'unknown';
		}

		if (!splitUsername[1]) {
			splitUsername[1] = new URL(config.url).host;
		}

		var grabbedUser = await db.getRepository('user').findOne({
			where: {
				username: splitUsername[0],
				host: splitUsername[1]
			}
		});

		if (
			splitUsername[0] === 'undefined' ||
			splitUsername[1] === 'undefined'
		) {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}

		if (grabbedUser) {
			if (grabbedUser.suspended) {
				return res.status(410).json({
					message: 'User suspended'
				});
			} else if (grabbedUser.deactivated) {
				return res.status(410).json({
					message: 'User deactivated'
				});
			} else {
				res.status(200).json(grabbedUser);
			}
		} else {
			if (splitUsername[1] !== new URL(config.url).host) {
				let actorApId = await getWebfingerAcct(
					splitUsername[0],
					splitUsername[1]
				);

				if (actorApId) {
					let fetchedRemoteActor = await getRemoteActor(actorApId);

					if (fetchedRemoteActor) {
						if (fetchedRemoteActor.suspended) {
							return res.status(410).json({
								message: 'User suspended'
							});
						} else if (fetchedRemoteActor.deactivated) {
							return res.status(410).json({
								message: 'User deactivated'
							});
						} else {
							res.status(200).json(fetchedRemoteActor);
						}
					} else {
						return res.status(404).json({
							message: 'User does not exist'
						});
					}
				} else {
					return res.status(404).json({
						message: 'User does not exist'
					});
				}
			} else {
				return res.status(404).json({
					message: 'User does not exist'
				});
			}
		}
	}
});

export default router;
