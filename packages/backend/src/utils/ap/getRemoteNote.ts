import db from '../database.js';
import logger from '../logger.js';
import getSigned from './getSigned.js';
import processNewNote from './processNewNote.js';

export default async function getRemoteNote(apId, localUserId?) {
	let grabbedRemoteNote = await db.getRepository('note').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteNote) {
		logger.debug('ap', 'remote note present in database');
		return grabbedRemoteNote;
	} else {
		logger.debug('ap', 'remote note not present in database');

		let response;

		let grabbedNote = await getSigned(apId, localUserId);

		if (grabbedNote.status === 401) {
			response = 'gone';
		} else if (grabbedNote.status === 410) {
			response = 'gone';
		} else {
			logger.debug('ap', 'fetched note sucessfully');

			response = await processNewNote(grabbedNote.data);
		}

		return await response;
	}
}
