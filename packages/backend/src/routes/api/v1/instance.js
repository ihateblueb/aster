import express from 'express';
const router = express.Router();

import pkg from '../../../../../../package.json' assert { type: 'json' };
import config from '../../../utils/config.js';
import db from '../../../utils/database.js';

router.get('/api/v1/instance', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var instanceJson = {};

	instanceJson['url'] = config.url;

	instanceJson['name'] = config.nodename;
	instanceJson['description'] = config.nodedesc;
	instanceJson['color'] = config.nodecolor;
	instanceJson['icon'] = config.nodeicon;

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
	instanceJson.stats['nstance_count'] = await db
		.getRepository('instances')
		.count();

	instanceJson['maintainer'] = config.maintainer;
	instanceJson['maintaineremail'] = config.maintaineremail;

	instanceJson['registration_type'] = config.a_registrations;

	res.json(instanceJson);
});

export default router;
