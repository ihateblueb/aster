import express from 'express';

import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import generateNote from '../../../generators/note.js';
import generateRepeat from '../../../generators/repeat.js';

const router = express.Router();

async function renderTimeline(grabbedNotes, grabbedRepeats) {
	let collectedNotes = [];

	for (const i of grabbedNotes.keys()) {
		let generatedNote = await generateNote(grabbedNotes[i]);

		if (generatedNote && generatedNote.status === 200) {
			collectedNotes.push({
				type: 'note',
				object: generatedNote.note
			});
			logger(
				'debug',
				'timeline',
				'rendered note ' + (i + 1) + '/' + grabbedNotes.length
			);
		} else {
			logger(
				'debug',
				'timeline',
				'failed to render note ' +
					(i + 1) +
					'/' +
					grabbedNotes.length +
					' error: ' +
					generatedNote.status +
					' ' +
					generatedNote.message
			);
		}
	}

	for (const i of grabbedRepeats.keys()) {
		let generatedRepeat = await generateRepeat(grabbedRepeats[i]);

		if (generatedRepeat && generatedRepeat.status === 200) {
			collectedNotes.push({
				type: 'repeat',
				object: generatedRepeat.repeat
			});
			logger(
				'debug',
				'timeline',
				'rendered repeat ' + (i + 1) + '/' + grabbedRepeats.length
			);
		} else {
			logger(
				'debug',
				'timeline',
				'failed to render repeat ' +
					(i + 1) +
					'/' +
					grabbedRepeats.length +
					' error: ' +
					generatedRepeat.status +
					' ' +
					generatedRepeat.message
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

	let grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	let grabbedRepeats = await db
		.getRepository('repeat')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes, grabbedRepeats));
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
