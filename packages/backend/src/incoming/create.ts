import logger from '../utils/logger.js';
import processNewActor from '../utils/ap/processNewActor.js';
import processNewNote from '../utils/ap/processNewNote.js';

export default async function ICreate(body) {
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
