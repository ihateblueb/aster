import express from 'express';

import getRemoteActor from '../../../utils/ap/getRemoteActor.js';
import getWebfingerAcct from '../../../utils/ap/getWebfingerAcct.js';
import config from '../../../utils/config.js';
import db from '../../../utils/database.js';

import buildUser from '../../../builders/user.js';

const router = express.Router();

// lookup by username
router.get('/api/v1/lookup/@:username', async (req, res) => {
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

		var grabbedUser = await db.getRepository('users').findOne({
			where: {
				username: splitUsername[0],
				host: splitUsername[1]
			}
		});

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
				let userJson = await buildUser(grabbedUser);
				res.status(200).json(userJson);
			}
		} else {
			let actorApId = await getWebfingerAcct(
				splitUsername[0],
				splitUsername[1]
			);
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
					let userJson = await buildUser(fetchedRemoteActor);
					res.status(200).json(userJson);
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
