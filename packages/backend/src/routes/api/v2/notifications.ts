import express from 'express';
import config from '../../../utils/config.js';
import generateNotificationsAll from '../../../generators/notifications/all.js';
import generateNotificationsMentions from '../../../generators/notifications/mentions.js';
import renderTimeline from '../../../utils/timeline/render.js';
import UserAuthService from '../../../services/UserAuthService.js';

const router = express.Router();

router.get('/api/v2/notifications/all', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		let take =
			req.query.max < config.get().timeline.maxNotes
				? req.query.max
				: config.get().timeline.maxNotes;

		res.status(200).json(
			await renderTimeline(
				await generateNotificationsAll(
					authRes.grabbedUserAuth.user,
					take,
					req.query.since
				)
			)
		);
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

router.get('/api/v2/notifications/mentions', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		let take =
			req.query.max < config.get().timeline.maxNotes
				? req.query.max
				: config.get().timeline.maxNotes;

		res.status(200).json(
			await renderTimeline(
				await generateNotificationsMentions(
					authRes.grabbedUserAuth.user,
					take,
					req.query.since
				)
			)
		);
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
