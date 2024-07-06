import db from '../database.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';

export default async function updateRemoteInstance(host, body) {
	let grabbedInstance = {};

	grabbedInstance = await db
		.getRepository('instance')
		.createQueryBuilder()
		.select('instance')
		.where({ host: host })
		.update({
			updated_at: new Date(Date.now()).toISOString()
		});

	if (body.nodeName) {
		grabbedInstance = await db
			.getRepository('instance')
			.createQueryBuilder()
			.select('instance')
			.where({ host: host })
			.update({
				name: body.nodeName
			});
	}
	if (body.nodeDescription) {
		grabbedInstance = await db
			.getRepository('instance')
			.createQueryBuilder()
			.select('instance')
			.where({ host: host })
			.update({
				description: body.nodeDescription
			});
	}

	if (body.software) {
		if (body.software.name) {
			grabbedInstance = await db
				.getRepository('instance')
				.createQueryBuilder()
				.select('instance')
				.where({ host: host })
				.update({
					name: body.software.name
				});
		}
		if (body.software.version) {
			grabbedInstance = await db
				.getRepository('instance')
				.createQueryBuilder()
				.select('instance')
				.where({ host: host })
				.update({
					version: body.software.version.toString()
				});
		}
	}

	if (body.metadata) {
		if (body.metadata.maintainer) {
			if (body.metadata.maintainer.name) {
				grabbedInstance = await db
					.getRepository('instance')
					.createQueryBuilder()
					.select('instance')
					.where({ host: host })
					.update({ maintainer: body.metadata.maintainer.name });
			}
			if (body.metadata.maintainer.email) {
				grabbedInstance = await db
					.getRepository('instance')
					.createQueryBuilder()
					.select('instance')
					.where({ host: host })
					.update({
						maintainer_email: body.metadata.maintainer.email
					});
			}
		}
	}

	if (body.usage) {
		if (body.usage.users) {
			if (body.usage.users.total) {
				grabbedInstance = await db
					.getRepository('instance')
					.createQueryBuilder()
					.select('instance')
					.where({ host: host })
					.update({ user_count: body.usage.users.total });
			}
		}
		if (body.usage.localPosts) {
			grabbedInstance = await db
				.getRepository('instance')
				.createQueryBuilder()
				.select('instance')
				.where({ host: host })
				.update({ note_count: body.usage.localPosts });
		}
	}

	logger('info', 'ap', 'updated remote instance ' + host);

	return grabbedInstance;
}
