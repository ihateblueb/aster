import express from 'express';

import config from '../../../utils/config.js';

import renderTimeline from '../../../utils/timeline/render.js';
import generateTimelinePublic from '../../../generators/timeline/public.js';
import generateTimelineBubble from '../../../generators/timeline/bubble.js';
import generateTimelineLocal from '../../../generators/timeline/local.js';
import generateTimelineHome from '../../../generators/timeline/home.js';
import generateTimelineTag from '../../../generators/timeline/tag.js';
import verifyToken from '../../../utils/auth/verifyToken.js';

const router = express.Router();

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.get().timeline.maxNotes
			? req.query.max
			: config.get().timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelinePublic(take, req.query.since)
		)
	);
});

router.get('/api/v2/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.get().timeline.maxNotes
			? req.query.max
			: config.get().timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(await generateTimelineLocal(take, req.query.since))
	);
});

router.get('/api/v2/timeline/bubble', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.get().timeline.maxNotes
			? req.query.max
			: config.get().timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelineBubble(take, req.query.since)
		)
	);
});

router.get('/api/v2/timeline/home', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		let take =
			req.query.max < config.get().timeline.maxNotes
				? req.query.max
				: config.get().timeline.maxNotes;

		let excludeLocal;

		if (req.query.excludeLocal) {
			excludeLocal = true;
		} else {
			excludeLocal = false;
		}

		res.status(200).json(
			await renderTimeline(
				await generateTimelineHome(
					authRes.grabbedUserAuth.user,
					excludeLocal,
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

router.get('/api/v2/timeline/tag', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.get().timeline.maxNotes
			? req.query.max
			: config.get().timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelineTag(take, req.query.since, req.query.tag)
		)
	);
});

export default router;
