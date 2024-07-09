import db from '../database.js';
import logger from '../logger.js';
import { JSDOM } from 'jsdom';
import sanitize from '../sanitize.js';

export default async function updateRemoteInstance(host, body) {
	let grabbedInstance = {};

	grabbedInstance = await db
		.getRepository('instance')
		.update(
			{ host: host },
			{ updated_at: new Date(Date.now()).toISOString() }
		);

	if (body.software) {
		if (body.software.name) {
			grabbedInstance = await db
				.getRepository('instance')
				.update({ host: host }, { software: body.software.name });
		}
		if (body.software.version) {
			grabbedInstance = await db
				.getRepository('instance')
				.update(
					{ host: host },
					{ version: body.software.version.toString() }
				);
		}
	}

	if (body.metadata) {
		if (body.metadata.maintainer) {
			if (body.metadata.maintainer.name) {
				await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ maintainer: body.metadata.maintainer.name }
					);
			}
			if (body.metadata.maintainer.email) {
				await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ maintainer_email: body.metadata.maintainer.email }
					);
			}
			if (body.metadata.nodeName) {
				grabbedInstance = await db
					.getRepository('instance')
					.update({ host: host }, { name: body.metadata.nodeName });
			}
			if (body.metadata.nodeDescription) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ description: body.metadata.nodeDescription }
					);
			}

			if (body.metadata.themeColor) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ color: body.metadata.themeColor }
					);
			}
		}
	}

	if (body.usage) {
		if (body.usage.users) {
			if (body.usage.users.total) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ user_count: body.usage.users.total }
					);
			}
		}
		if (body.usage.localPosts) {
			grabbedInstance = await db
				.getRepository('instance')
				.update({ host: host }, { note_count: body.usage.localPosts });
		}
	}

	// to get instance color if not set in nodeinfo, and favicon

	let req = await fetch('https://' + host);
	const html = req.text();

	const { window } = new JSDOM(html);
	let doc = window.document;

	console.log(doc);
	console.log(await doc.getElementsByTagName('link'));

	logger('info', 'ap', 'updated remote instance ' + host);

	return grabbedInstance;
}
