import express from 'express';

import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import generateNote from '../../../generators/note.js';
import generateRepeat from '../../../generators/repeat.js';
import config from '../../../utils/config.js';
import { LessThan } from 'typeorm';

const router = express.Router();

async function renderTimeline(collectedObjects) {
	console.log(collectedObjects);

	let collectedNotes = [];

	for (const i of collectedObjects.keys()) {
		if (collectedObjects[i]) {
			if (collectedObjects[i].type === 'note') {
				let generatedNote = await generateNote(
					collectedObjects[i].object
				);

				if (generatedNote && generatedNote.status === 200) {
					collectedNotes.push({
						type: 'note',
						object: generatedNote.note
					});
					logger(
						'debug',
						'timeline',
						'rendered note ' +
							(i + 1) +
							'/' +
							collectedObjects.length
					);
				} else {
					logger(
						'debug',
						'timeline',
						'failed to render note ' +
							(i + 1) +
							'/' +
							collectedObjects.length +
							' error: ' +
							generatedNote.status +
							' ' +
							generatedNote.message
					);
				}
			} else if (collectedObjects[i].type === 'repeat') {
				let generatedRepeat = await generateRepeat(
					collectedObjects[i].object
				);

				if (generatedRepeat && generatedRepeat.status === 200) {
					collectedNotes.push({
						type: 'repeat',
						object: generatedRepeat.repeat
					});
					logger(
						'debug',
						'timeline',
						'rendered repeat ' +
							(i + 1) +
							'/' +
							collectedObjects.length
					);
				} else {
					logger(
						'debug',
						'timeline',
						'failed to render repeat ' +
							(i + 1) +
							'/' +
							collectedObjects.length +
							' error: ' +
							generatedRepeat.status +
							' ' +
							generatedRepeat.message
					);
				}
			}
		} else {
			console.log(collectedObjects[i]);
			logger(
				'debug',
				'timeline',
				'failed to render object ' +
					(i + 1) +
					'/' +
					collectedObjects.length +
					' error: empty!'
			);
		}
	}

	collectedNotes.sort(
		(x, y) =>
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	return collectedNotes;
}

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	let take =
		req.query.max < config.timeline.maxNotes
			? req.query.max
			: config.timeline.maxNotes;

	let collectedObjects = [];

	let grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({
			visibility: 'public',
			created_at: LessThan(
				req.query.since ? req.query.since : new Date(Date.now())
			)
		})
		.orderBy('created_at', 'DESC')
		.take(take)
		.getMany();

	if (grabbedNotes) {
		await grabbedNotes.forEach(async (e) => {
			collectedObjects.push({
				type: 'note',
				object: e
			});
		});
	}

	let grabbedRepeats = await db
		.getRepository('repeat')
		.createQueryBuilder()
		.where({
			visibility: 'public',
			created_at: LessThan(
				req.query.since ? req.query.since : new Date(Date.now())
			)
		})
		.orderBy('created_at', 'DESC')
		.take(take)
		.getMany();

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

	let grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public', local: true })
		.getMany();

	let grabbedRepeats = await db
		.getRepository('repeat')
		.createQueryBuilder()
		.where({ visibility: 'public', local: true })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes, grabbedRepeats));
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
