import db from '../database.js';
import logger from '../logger.js';
import getSigned from './getSigned.js';
import processNewActor from './processNewActor.js';

export default async function getRemoteActor(apId) {
	logger('debug', 'ap', 'getting remote actor with id ' + apId);

	var grabbedRemoteActor = await db.getRepository('user').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteActor) {
		logger('debug', 'ap', 'remote actor present in database');
		return grabbedRemoteActor;
	} else {
		logger('debug', 'ap', 'remote actor not present in database');

		let response;

		let res = await getSigned(apId);

		if (res.status === 401) {
			response = 'gone';
		} else if (res.status === '410') {
			response = 'gone';
		} else if (!res.status) {
			// idk? just trying things
			response = 'gone';
		} else {
			logger('debug', 'ap', 'fetched actor sucessfully');
			response = await processNewActor(res.data);
		}

		return await response;
	}
}
