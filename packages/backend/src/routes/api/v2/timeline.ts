import express from 'express';

import config from '../../../utils/config.js';

import renderTimeline from '../../../utils/timeline/render.js';
import generateTimelinePublic from '../../../generators/timeline/public.js';
import generateTimelineBubble from '../../../generators/timeline/bubble.js';
import generateTimelineLocal from '../../../generators/timeline/local.js';
import generateTimelineHome from '../../../generators/timeline/home.js';
import generateTimelineTag from '../../../generators/timeline/tag.js';

const router = express.Router();

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelinePublic(take, req.query.since)
		)
	);
});

router.get('/api/v2/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(await generateTimelineLocal(take, req.query.since))
	);
});

router.get('/api/v2/timeline/bubble', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelineBubble(take, req.query.since)
		)
	);
});

router.get('/api/v2/timeline/home', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(await generateTimelineHome(take, req.query.since))
	);
});

router.get('/api/v2/timeline/tag', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	res.status(200).json(
		await renderTimeline(
			await generateTimelineTag(take, req.query.since, req.query.tag)
		)
	);
});

export default router;
