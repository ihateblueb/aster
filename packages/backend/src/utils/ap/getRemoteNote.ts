import axios from 'axios';

import db from '../database.js';
import logger from '../logger.js';
import getSigned from './getSigned.js';

import processNewNote from './processNewNote.js';

export default async function getRemoteNote(apId) {
	var grabbedRemoteNote = await db.getRepository('notes').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteNote) {
		logger('debug', 'ap', 'remote note present in database');
		return grabbedRemoteNote;
	} else {
		logger('debug', 'ap', 'remote note not present in database');

		let response;

		// needs userid, figure out how to give that
		await getSigned(apId)
			.then(async (res) => {
				logger('debug', 'ap', 'fetched note sucessfully');
				response = await processNewNote(res.data);
			})
			.catch((e) => {
				// in case they can't be fetched, this will be sent so they are ignored.
				if (e.response && e.response.status === 410) {
					response = 'gone';
				} else if (e.response && e.response.status === 401) {
					response = 'gone';
				} else {
					logger('error', 'ap', e);
				}
			});

		return await response;
	}
}
