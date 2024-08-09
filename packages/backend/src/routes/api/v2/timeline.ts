import express from 'express';

import db from '../../../utils/database.js';
import ApiNote from '../../../constructors/note.js';
import logger from '../../../utils/logger.js';
import generateNote from '../../../generators/note.js';

const router = express.Router();

async function renderTimeline(grabbedNotes) {
	var collectedNotes = [];

	for (const i of grabbedNotes.keys()) {
		let generatedNote = await generateNote(grabbedNotes[i]);

		if (generatedNote && generatedNote.status === 200) {
			collectedNotes.push(generatedNote.note);
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

	collectedNotes.sort(
		(x, y) => +new Date(y.created_at) - +new Date(x.created_at)
	);

	return collectedNotes;
}

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

router.get('/api/v2/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public', local: true })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

router.get('/api/v2/timeline/tag/:tag', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		// uuuuughh this query is gonna be fucked
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

export default router;
