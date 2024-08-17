import db from '../database.js';
import Logger from '../logger.js';
import getSigned from './getSigned.js';
import processNewEmoji from './processNewEmoji.js';

export default async function getRemoteEmoji(apId, localUserId?) {
	let grabbedRemoteEmoji = await db.getRepository('emoji').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteEmoji) {
		Logger.debug('ap', 'remote emoji present in database');
		return grabbedRemoteEmoji;
	} else {
		Logger.debug('ap', 'remote emoji not present in database');

		let response;

		let grabbedEmoji = await getSigned(apId, localUserId);

		if (grabbedEmoji.status === 401) {
			response = 'gone';
		} else if (grabbedEmoji.status === 410) {
			response = 'gone';
		} else {
			Logger.debug('ap', 'fetched emoji sucessfully');

			response = await processNewEmoji(grabbedEmoji.data);
		}

		return await response;
	}
}
