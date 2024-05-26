import express from 'express';
const router = express.Router();

import db from '../../../utils/database.js';
import config from '../../../utils/config.js';

// lookup by username
router.get('/api/v1/lookup/@:username', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.username) {
		return res.status(400).json({
			message: 'Username parameter required'
		});
	} else {
		// set default
		let splitUsername = ['unknown', new URL(config.url).host];
		splitUsername = req.params.username.split('@');

		console.log(JSON.stringify(splitUsername));

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
				var userJson = {};

				userJson['id'] = grabbedUser.id;

				res.status(200).json(userJson);
			}
		} else {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
	}
});

export default router;
