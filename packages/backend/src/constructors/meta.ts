import pkg from '../../../../package.json' with { type: 'json' };
import { Meta } from '../entities/Meta.js';
import config from '../utils/config.js';
import db from '../utils/database.js';

export default async function buildMeta(grabbedMeta) {
	grabbedMeta = new Meta()
	var metaJson = { stats: {} };

	metaJson['url'] = config.url;

	metaJson['name'] = grabbedMeta.name ?? 'Aster';
	metaJson['created_at'] = grabbedMeta.created_at ?? undefined;
	metaJson['description'] = grabbedMeta.description_long ?? 'An instance running Aster';
	metaJson['description_short'] = grabbedMeta.description ?? 'An instance running Aster';
	metaJson['color'] = grabbedMeta.color ?? '#756bcf';

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

		if (grabbedMeta.maintainer) {

			metaJson['maintainer'] = grabbedMeta.maintainer;
			}
	if (grabbedMeta.maintainer_email) {

	metaJson['maintainer_email'] = grabbedMeta.maintainer_email;
	}

	metaJson['registration'] = grabbedMeta.registration || 'closed';

if (grabbedMeta.rules) {
	metaJson['rules'] = grabbedMeta.rules;
}

	return metaJson;
}
