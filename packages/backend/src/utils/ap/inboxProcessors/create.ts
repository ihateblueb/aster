import logger from '../../logger.js';
import processNewActor from '../processNewActor.js';
import processNewNote from '../processNewNote.js';

export default async function IPCreate(body) {
	if (body.object.type === 'Note') {
		await processNewNote(body.object);
	} else if (body.object.type === 'Actor') {
		await processNewActor(body.object);
	} else if (body.object.type === 'Service') {
		await processNewActor(body.object);
	} else {
		logger('warn', 'ap', 'unknown Create type ' + body.object.type);
	}
}
