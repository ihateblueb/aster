import express from 'express';
const router = express.Router();

import pkg from '../../../../../package.json' assert { type: 'json' };
import config from '../../utils/config.js';
import db from '../../utils/database';

router.get('/nodeinfo/2.0', async (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');

	var userCount = await db.getRepository('users').findAndCount({
		where: {
			local: true
		}
	});
	var userCount = userCount[1];

	var noteCount = await db.getRepository('notes').findAndCount({
		where: {
			local: true
		}
	});
	var noteCount = noteCount[1];

	var nodeinfoJson = {
		version: '2.0',
		software: {
			name: `${pkg.name}`,
			version: `${pkg.version}`
		},
		protocols: ['activitypub'],
		services: {
			outbound: [],
			inbound: []
		},
		openRegistrations: false,
		metadata: {
			nodeName: `${config.nodename}`,
			nodeDescription: `${config.nodedesc}`,
			themeColor: `${config.nodecolor}`
		},
		usage: {
			users: {
				total: `${userCount}`
			},
			localPosts: `${noteCount}`
		}
	};

	if (config.maintainer && config.maintaineremail) {
		nodeinfoJson['maintainer'] = {};
		nodeinfoJson.maintainer = {
			name: `${config.nodeadmin}`,
			email: `${config.nodeadmincontact}`
		};
	}

	res.json(nodeinfoJson);
});

export default router;
