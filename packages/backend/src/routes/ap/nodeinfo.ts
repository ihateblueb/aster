import express from 'express';
const router = express.Router();

import pkg from '../../../../../package.json' assert { type: 'json' };
import config from '../../utils/config.js';
import db from '../../utils/database.js';

router.get('/nodeinfo/2.0', async (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');

	var userCountDb = await db.getRepository('users').findAndCount({
		where: {
			local: true
		}
	});
	var userCount = userCountDb[1];

	var noteCountDb = await db.getRepository('notes').findAndCount({
		where: {
			local: true
		}
	});
	var noteCount = noteCountDb[1];

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
			themeColor: `${config.nodecolor}`,
			maintainer: {
				name: `${config.maintainer}`,
				email: `${config.maintaineremail}`
			}
		},
		usage: {
			users: {
				total: `${userCount}`
			},
			localPosts: `${noteCount}`
		}
	};

	res.status(200).json(nodeinfoJson);
});

export default router;
