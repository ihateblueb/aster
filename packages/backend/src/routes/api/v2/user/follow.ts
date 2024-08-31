import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';

const router = express.Router();

router.post(`/api/v2/user/:userid/follow`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.userid) {
		if (authRes.status === 200) {
			let grabbedUser = await db.getRepository('user').findOne({
				where: {
					id: req.params.userid
				}
			});

			if (grabbedUser) {
				if (grabbedUser.id === authRes.grabbedUserAuth.user) {
					res.status(400).json({
						message: 'You cannot follow yourself'
					});
				} else {
					if (!grabbedUser.local) {
					}
					res.status(501).json({
						message: 'unfihisehd'
					});
				}
			} else {
				res.status(404).json({
					message: 'User not found'
				});
			}
		} else {
			res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		res.status(400).json({
			message: 'User ID parameter required'
		});
	}
});

export default router;
