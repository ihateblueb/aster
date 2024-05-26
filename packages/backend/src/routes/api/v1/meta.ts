import express from 'express';
const router = express.Router();

import pkg from '../../../../../../package.json' assert { type: 'json' };
import config from '../../../utils/config.js';
import db from '../../../utils/database.js';

router.get('/api/v1/meta', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const metaDb = await db.getRepository('meta').find();

	const meta = metaDb[0];

	var instanceJson = {
		stats: {}
	};

	instanceJson['url'] = config.url;

	instanceJson['name'] = meta.name;
	instanceJson['created_at'] = meta.created_at;
	instanceJson['description'] = meta.description_long;
	instanceJson['description_short'] = meta.description;
	instanceJson['color'] = meta.color;

	instanceJson['software'] = pkg.name;
	instanceJson['version'] = pkg.version;
	instanceJson['author'] = pkg.author;

	instanceJson['stats'] = {};
	instanceJson.stats['local_user_count'] = await db
		.getRepository('users')
		.count({ where: { local: true } });
	instanceJson.stats['local_note_count'] = await db
		.getRepository('notes')
		.count({ where: { local: true } });
	instanceJson.stats['total_user_count'] = await db
		.getRepository('users')
		.count();
	instanceJson.stats['total_note_count'] = await db
		.getRepository('notes')
		.count();
	instanceJson.stats['instance_count'] = await db
		.getRepository('instances')
		.count();

	instanceJson['maintainer'] = meta.maintainer;
	instanceJson['maintainer_email'] = meta.maintainer_email;

	instanceJson['registration'] = meta.registration;

	instanceJson['rules'] = meta.rules;

	res.status(200).json(instanceJson);
});

export default router;
