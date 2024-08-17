import config from '../config.js';
import db from '../database.js';
import Logger from '../logger.js';
import getNodeinfo from './getNodeinfo.js';
import getSigned from './getSigned.js';
import processNewInstance from './processNewInstance.js';
import updateRemoteInstance from './updateRemoteInstance.js';

export default async function getRemoteInstance(host) {
	if (host !== new URL(config.url).host) {
		let grabbedRemoteInstance = await db.getRepository('instance').findOne({
			where: {
				host: host
			}
		});

		if (grabbedRemoteInstance) {
			Logger.debug(
				'ap',
				'remote instance present in database. updating.'
			);

			let response;

			let grabbedNodeinfoUrl = await getNodeinfo(host);

			if (grabbedNodeinfoUrl) {
				let grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

				if (grabbedNodeinfo.error) {
					return false;
				} else {
					Logger.debug('ap', 'fetched instance sucessfully');

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
			Logger.debug('ap', 'remote instance not present in database');

			let response;

			let grabbedNodeinfoUrl = await getNodeinfo(host);

			if (grabbedNodeinfoUrl) {
				let grabbedNodeinfo = await getSigned(grabbedNodeinfoUrl);

				if (grabbedNodeinfo.error) {
					return false;
				} else {
					Logger.debug('ap', 'fetched instance sucessfully');

					response = await processNewInstance(
						host,
						grabbedNodeinfo.data
					);
				}

				return await response;
			} else {
				return false;
			}
		}
	}
}
