import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';

const router = express.Router();

router.post(`/api/v2/user/:userid/follow`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.userid) {
		if (authRes.status === 200) {
			var grabbedUser = await db.getRepository('user').findOne({
				where: {
					id: req.params.userid
				}
			});

			if (grabbedUser) {
				if (!grabbedUser.local) {
				}
			} else {
				return res.status(404).json({
					message: 'User not found'
				});
			}
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	}
});

export default router;
