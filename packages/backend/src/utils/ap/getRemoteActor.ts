import db from '../database.js';
import Logger from '../logger.js';
import getRemoteInstance from './getRemoteInstance.js';
import getSigned from './getSigned.js';
import processNewActor from './processNewActor.js';

export default async function getRemoteActor(apId) {
	getRemoteInstance(new URL(apId).host);

	Logger.debug('ap', 'getting remote actor with id ' + apId);

	let grabbedRemoteActor = await db.getRepository('user').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteActor) {
		Logger.debug('ap', 'remote actor present in database. updating');
		return grabbedRemoteActor;
	} else {
		Logger.debug('ap', 'remote actor not present in database');

		let response;

		let res = await getSigned(apId);

		if (res.status === 401) {
			response = 'gone';
		} else if (res.status === 410) {
			response = 'gone';
		} else if (!res.status) {
			// idk? just trying things
			response = 'gone';
		} else {
			Logger.debug('ap', 'fetched actor sucessfully');
			response = await processNewActor(res.data);
		}

		return await response;
	}
}
