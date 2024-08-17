import db from '../database.js';
import Logger from '../logger.js';
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
				.update(
					{ host: host },
					{ software: sanitize(body.software.name) }
				);
		}
		if (body.software.version) {
			grabbedInstance = await db
				.getRepository('instance')
				.update(
					{ host: host },
					{ version: sanitize(body.software.version.toString()) }
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
						{ maintainer: sanitize(body.metadata.maintainer.name) }
					);
			}
			if (body.metadata.maintainer.email) {
				await db.getRepository('instance').update(
					{ host: host },
					{
						maintainer_email: sanitize(
							body.metadata.maintainer.email
						)
					}
				);
			}
			if (body.metadata.nodeName) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ name: sanitize(body.metadata.nodeName) }
					);
			}
			if (body.metadata.nodeDescription) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ description: sanitize(body.metadata.nodeDescription) }
					);
			}

			if (body.metadata.themeColor) {
				grabbedInstance = await db
					.getRepository('instance')
					.update(
						{ host: host },
						{ color: sanitize(body.metadata.themeColor) }
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
						{ user_count: sanitize(body.usage.users.total) }
					);
			}
		}
		if (body.usage.localPosts) {
			grabbedInstance = await db
				.getRepository('instance')
				.update(
					{ host: host },
					{ note_count: sanitize(body.usage.localPosts) }
				);
		}
	}

	// to get instance color if not set in nodeinfo, and favicon

	//let req = await fetch('https://' + host);
	//const html = req.text();

	//const { window } = new JSDOM(html);
	//let doc = window.document;

	//console.log(doc);
	//console.log(await doc.getElementsByTagName('link'));

	Logger.info('ap', 'updated remote instance ' + host);

	return grabbedInstance;
}
