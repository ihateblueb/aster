import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';

export default async function processNewInstance(host, body) {
	let instanceToInsert = {
		id: ''
	};

	const instanceId = uuidv4();

	instanceToInsert['id'] = instanceId;
	instanceToInsert['host'] = host;
	instanceToInsert['icon'] = 'https://' + host + '/favicon.ico';
	instanceToInsert['created_at'] = new Date(Date.now()).toISOString();
	instanceToInsert['updated_at'] = new Date(Date.now()).toISOString();
	instanceToInsert['last_communicated'] = new Date(Date.now()).toISOString();

	if (body.nodeName) {
		instanceToInsert['name'] = sanitize(body.nodeName);
	}
	if (body.nodeDescription) {
		instanceToInsert['description'] = sanitize(body.nodeDescription);
	}

	if (body.software) {
		if (body.software.name) {
			instanceToInsert['software'] = sanitize(body.software.name);
		}
		if (body.software.version) {
			instanceToInsert['version'] = sanitize(
				body.software.version.toString()
			);
		}
	}

	if (body.metadata) {
		if (body.metadata.maintainer) {
			if (body.metadata.maintainer.name) {
				instanceToInsert['maintainer'] = sanitize(
					body.metadata.maintainer.name
				);
			}
			if (body.metadata.maintainer.email) {
				instanceToInsert['maintainer_email'] = sanitize(
					body.metadata.maintainer.email
				);
			}
			if (body.metadata.themeColor) {
				instanceToInsert['color'] = sanitize(body.metadata.themeColor);
			}
		}
	}

	if (body.usage) {
		if (body.usage.users) {
			if (body.usage.users.total) {
				instanceToInsert['user_count'] = sanitize(
					body.usage.users.total
				);
			}
		}
		if (body.usage.localPosts) {
			instanceToInsert['note_count'] = sanitize(body.usage.localPosts);
		}
	}

	console.log(instanceToInsert);

	await db.getRepository('instance').insert(instanceToInsert);

	Logger.info('ap', 'created remote instance ' + host);

	return instanceToInsert;
}
