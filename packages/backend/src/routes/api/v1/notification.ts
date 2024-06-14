import express from 'express';

import db from '../../../utils/database.js';
import verifyToken from '../../../utils/auth/verifyToken.js';

const router = express.Router();

router.get('/api/v1/notifications', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		var grabbedNotifications = await db
			.getRepository('users_notification')
			.find({
				where: {
					to: authRes.grabbedUserAuth.user
				}
			});
		return res.status(200).json(grabbedNotifications);
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;