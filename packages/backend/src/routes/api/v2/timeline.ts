import express from 'express';

import db from '../../../utils/database.js';
import config from '../../../utils/config.js';
import { LessThan } from 'typeorm';
import renderTimeline from '../../../utils/timeline/render.js';

const router = express.Router();

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	let collectedObjects = [];

	let grabbedNotes;

	if (req.query.since) {
		grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({
				visibility: 'public',
				created_at: LessThan(req.query.since)
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	} else {
		grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({
				visibility: 'public'
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	}

	if (grabbedNotes) {
		await grabbedNotes.forEach(async (e) => {
			collectedObjects.push({
				type: 'note',
				object: e
			});
		});
	}

	let grabbedRepeats;

	if (req.query.since) {
		grabbedRepeats = await db
			.getRepository('repeat')
			.createQueryBuilder()
			.where({
				visibility: 'public',
				created_at: LessThan(req.query.since)
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	} else {
		grabbedRepeats = await db
			.getRepository('repeat')
			.createQueryBuilder()
			.where({
				visibility: 'public'
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	}

	if (grabbedRepeats) {
		await grabbedRepeats.forEach(async (e) => {
			collectedObjects.push({
				type: 'repeat',
				object: e
			});
		});
	}

	collectedObjects.sort(
		(x, y) =>
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	if (collectedObjects.length > take) {
		collectedObjects.length = take;
	}

	res.status(200).json(await renderTimeline(collectedObjects));
});

router.get('/api/v2/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	let collectedObjects = [];

	let grabbedNotes;

	if (req.query.since) {
		grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({
				local: true,
				visibility: 'public',
				created_at: LessThan(req.query.since)
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	} else {
		grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({
				local: true,
				visibility: 'public'
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	}

	if (grabbedNotes) {
		await grabbedNotes.forEach(async (e) => {
			collectedObjects.push({
				type: 'note',
				object: e
			});
		});
	}

	let grabbedRepeats;

	if (req.query.since) {
		grabbedRepeats = await db
			.getRepository('repeat')
			.createQueryBuilder()
			.where({
				local: true,
				visibility: 'public',
				created_at: LessThan(req.query.since)
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	} else {
		grabbedRepeats = await db
			.getRepository('repeat')
			.createQueryBuilder()
			.where({
				local: true,
				visibility: 'public'
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	}

	if (grabbedRepeats) {
		await grabbedRepeats.forEach(async (e) => {
			collectedObjects.push({
				type: 'repeat',
				object: e
			});
		});
	}

	collectedObjects.sort(
		(x, y) =>
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	if (collectedObjects.length > take) {
		collectedObjects.length = take;
	}

	res.status(200).json(await renderTimeline(collectedObjects));
});

router.get('/api/v2/timeline/tag/:tag', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		// uuuuughh this query is gonna be fucked
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json();
});

export default router;
