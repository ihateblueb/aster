import pkg from '../../../../package.json' assert { type: 'json' };
import config from '../utils/config.js';
import db from '../utils/database.js';

export default async function buildMeta(grabbedMeta) {
	var metaJson = { stats: {} };

	metaJson['url'] = config.url;

	metaJson['name'] = meta.name;
	metaJson['created_at'] = meta.created_at;
	metaJson['description'] = meta.description_long;
	metaJson['description_short'] = meta.description;
	metaJson['color'] = meta.color;

	metaJson['software'] = pkg.name;
	metaJson['version'] = pkg.version;
	metaJson['author'] = pkg.author;

	metaJson['stats'] = {};
	metaJson.stats['local_user_count'] = await db
		.getRepository('users')
		.count({ where: { local: true } });
	metaJson.stats['local_note_count'] = await db
		.getRepository('notes')
		.count({ where: { local: true } });
	metaJson.stats['total_user_count'] = await db
		.getRepository('users')
		.count();
	metaJson.stats['total_note_count'] = await db
		.getRepository('notes')
		.count();
	metaJson.stats['instance_count'] = await db
		.getRepository('instances')
		.count();

	metaJson['maintainer'] = meta.maintainer;
	metaJson['maintainer_email'] = meta.maintainer_email;

	metaJson['registration'] = meta.registration;

	metaJson['rules'] = meta.rules;

	return metaJson;
}
