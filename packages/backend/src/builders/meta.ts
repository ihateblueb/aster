import pkg from '../../../../package.json' with { type: 'json' };
import config from '../utils/config.js';
import db from '../utils/database.js';

export default async function buildMeta(grabbedMeta) {
	var metaJson = { stats: {} };

	metaJson['url'] = config.url;

	metaJson['name'] = grabbedMeta.name;
	metaJson['created_at'] = grabbedMeta.created_at;
	metaJson['description'] = grabbedMeta.description_long;
	metaJson['description_short'] = grabbedMeta.description;
	metaJson['color'] = grabbedMeta.color;

	metaJson['software'] = pkg.name;
	metaJson['version'] = pkg.version;
	metaJson['author'] = pkg.author;

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

	metaJson['maintainer'] = grabbedMeta.maintainer;
	metaJson['maintainer_email'] = grabbedMeta.maintainer_email;

	metaJson['registration'] = grabbedMeta.registration;

	metaJson['rules'] = grabbedMeta.rules;

	return metaJson;
}
