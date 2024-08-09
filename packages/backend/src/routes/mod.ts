import express from 'express';

import verifyToken from '../utils/auth/verifyToken.js';
import db from '../utils/database.js';

const router = express.Router();

router.get('/mod*', async (req, res, next) => {
	var authRes = await verifyToken(req, true);

	if (authRes.status === 200) {
		var grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: authRes.grabbedUserAuth.user
			}
		});

		if (grabbedUser.mod) {
			next();
		} else {
			return res.status(401).json({
				message: 'User is not a mod'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
