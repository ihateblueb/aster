import generateNote from '../../generators/note.js';
import generateRepeat from '../../generators/repeat.js';
import logger from '../logger.js';

export default async function renderTimeline(collectedObjects) {
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
