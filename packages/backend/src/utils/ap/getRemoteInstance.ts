import db from '../database.js';
import logger from '../logger.js';
import getNodeinfo from './getNodeinfo.js';
import getSigned from './getSigned.js';
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

		if (grabbedNodeinfoUrl) {
			var grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

			if (grabbedNodeinfo.error) {
				return false;
			} else {
				logger('debug', 'ap', 'fetched instance sucessfully');

				response = await updateRemoteInstance(
					host,
					grabbedNodeinfo.data
				);
			}

			return await response;
		} else {
			return false;
		}
	} else {
		logger('debug', 'ap', 'remote instance not present in database');

		let response;

		var grabbedNodeinfoUrl = await getNodeinfo(host);

		if (grabbedNodeinfoUrl) {
			var grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

			if (grabbedNodeinfo.error) {
				return false;
			} else {
				logger('debug', 'ap', 'fetched instance sucessfully');

				response = await processNewInstance(host, grabbedNodeinfo.data);
			}

			return await response;
		} else {
			return false;
		}
	}
}
