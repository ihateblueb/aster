import generateNote from '../../generators/note.js';
import generateNotification from '../../generators/notification.js';
import generateRepeat from '../../generators/repeat.js';
import Logger from '../logger.js';

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
					Logger.debug(
						'timeline',
						'rendered note ' +
							(i + 1) +
							'/' +
							collectedObjects.length
					);
				} else {
					Logger.debug(
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
					Logger.debug(
						'timeline',
						'rendered repeat ' +
							(i + 1) +
							'/' +
							collectedObjects.length
					);
				} else {
					Logger.debug(
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
			} else if (collectedObjects[i].type === 'notification') {
				let generatedNotification = await generateNotification(
					collectedObjects[i].object
				);

				if (
					generatedNotification &&
					generatedNotification.status === 200
				) {
					collectedNotes.push({
						type: 'notification',
						object: generatedNotification.notification
					});
					Logger.debug(
						'timeline',
						'rendered notification ' +
							(i + 1) +
							'/' +
							collectedObjects.length
					);
				} else {
					Logger.debug(
						'timeline',
						'failed to render notification ' +
							(i + 1) +
							'/' +
							collectedObjects.length +
							' error: ' +
							generatedNotification.status +
							' ' +
							generatedNotification.message
					);
				}
			} else {
				console.log(collectedObjects[i]);
				Logger.debug(
					'timeline',
					'failed to render object ' +
						(i + 1) +
						'/' +
						collectedObjects.length +
						' error: empty!'
				);
			}
		}
	}

	collectedNotes.sort(
		(x, y) =>
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	return collectedNotes;
}
