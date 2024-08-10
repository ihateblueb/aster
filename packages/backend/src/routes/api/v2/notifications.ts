import express from 'express';

import verifyToken from '../../../utils/auth/verifyToken.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import generateNotification from '../../../generators/notification.js';

const router = express.Router();

async function renderTimeline(grabbedNotifications) {
	var collectedNotification = [];

	for (const i of grabbedNotifications.keys()) {
		let generatedNotification = await generateNotification(
			grabbedNotifications[i]
		);

		if (generatedNotification && generatedNotification.status === 200) {
			collectedNotification.push(generatedNotification.notification);
			logger(
				'debug',
				'timeline',
				'rendered notification ' +
					(i + 1) +
					'/' +
					grabbedNotifications.length
			);
		} else {
			logger(
				'debug',
				'timeline',
				'failed to render notification ' +
					(i + 1) +
					'/' +
					grabbedNotifications.length +
					' error: ' +
					grabbedNotifications.status +
					' ' +
					grabbedNotifications.message
			);
		}
	}

	collectedNotification.sort(
		(x, y) => +new Date(y.created_at) - +new Date(x.created_at)
	);

	return collectedNotification;
}

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
			return res
				.status(200)
				.json(await renderTimeline(grabbedNotifications));
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
