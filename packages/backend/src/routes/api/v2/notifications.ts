import express from 'express';

import verifyToken from '../../../utils/auth/verifyToken.js';
import db from '../../../utils/database.js';

const router = express.Router();

router.get('/api/v2/notifications', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var authRes = await verifyToken(req);

	if (authRes.status === 200) {
		var grabbedNotifications = await db
			.getRepository('user_notification')
			.find({
				where: {
					to: authRes.grabbedUserAuth.user
				}
			});

		if (grabbedNotifications) {
			grabbedNotifications.sort(
				(x, y) => +new Date(x.created_at) - +new Date(y.created_at)
			);

			return res.status(200).json(grabbedNotifications);
		} else {
			return res.status(204).json({
				message: 'No notifications'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
