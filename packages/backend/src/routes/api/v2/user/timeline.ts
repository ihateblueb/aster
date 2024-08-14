import express from 'express';

import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import generateNote from '../../../../generators/note.js';
import generateRepeat from '../../../../generators/repeat.js';

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

router.get('/api/v2/user/:userid/timeline', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	if (req.params.userid) {
		let grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({ visibility: 'public', author: req.params.userid })
			.getMany();

		let grabbedRepeats = await db
			.getRepository('repeat')
			.createQueryBuilder()
			.where({ visibility: 'public', author: req.params.userid })
			.getMany();

		res.status(200).json(
			await renderTimeline(grabbedNotes, grabbedRepeats)
		);
	} else {
		res.status(400).json({
			message: 'User id required'
		});
	}
});

export default router;
