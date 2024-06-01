import axios from 'axios';

import db from '../database.js';
import logger from '../logger.js';

import processNewActor from './processNewActor.js';

export default async function getRemoteActor(apId) {
	var grabbedRemoteActor = await db.getRepository('users').findOne({
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

		await axios
			.get(apId, {
				headers: {
					Accept: 'application/activity+json'
				}
			})
			.then(async (res) => {
				logger('debug', 'ap', 'fetched actor sucessfully');
				response = await processNewActor(res.data);
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
