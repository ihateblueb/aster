import db from '../database.js';
import logger from '../logger.js';
import getNodeinfo from './getNodeinfo.js';
import getSigned from './getSigned.js';
import processNewEmoji from './processNewEmoji.js';
import processNewInstance from './processNewInstance.js';
import updateRemoteInstance from './updateRemoteInstance.js';

export default async function getRemoteInstance(host) {
	var grabbedRemoteInstance = await db.getRepository('instance').findOne({
		where: {
			host: host
		}
	});

	if (grabbedRemoteInstance) {
		logger('debug', 'ap', 'remote instance present in database. updating.');

		let response;

		var grabbedNodeinfoUrl = await getNodeinfo(host);
		var grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

		// 404 or 401 should NOT be treated as 'gone'. small config errors onm the other server's end can cause these to be returned

		if (grabbedNodeinfo.status === 401) {
			logger(
				'error',
				'ap',
				'fetched instance unsuccessfully with 401. ignoring.'
			);
		} else if (grabbedNodeinfo.status === 410) {
			response = 'gone';
		} else {
			logger('debug', 'ap', 'fetched instance sucessfully');

			response = await updateRemoteInstance(host, grabbedNodeinfo.data);
		}

		return await response;
	} else {
		logger('debug', 'ap', 'remote instance not present in database');

		let response;

		var grabbedNodeinfoUrl = await getNodeinfo(host);
		var grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

		// 404 or 401 should NOT be treated as 'gone'. small config errors onm the other server's end can cause these to be returned

		if (grabbedNodeinfo.status === 401) {
			logger(
				'error',
				'ap',
				'fetched instance unsuccessfully with 401. ignoring.'
			);
		} else if (grabbedNodeinfo.status === 410) {
			response = 'gone';
		} else {
			logger('debug', 'ap', 'fetched instance sucessfully');

			response = await processNewInstance(host, grabbedNodeinfo.data);
		}

		return await response;
	}
}
