import express from 'express';

import pkg from '../../../../../package.json' with { type: 'json' };
import db from '../../utils/database.js';

const router = express.Router();

router.get('/nodeinfo/2.0', async (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');

	var userCount = await db.getRepository('user').count({
		where: {
			local: true
		}
	});

	var noteCount = await db.getRepository('notes').count({
		where: {
			local: true
		}
	});

	const metaDb = await db.getRepository('meta').find();
	const meta = metaDb[0];

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
			nodeName: `${meta.name}`,
			nodeDescription: `${meta.description_long}`,
			themeColor: `${meta.color}`,
			maintainer: {
				name: `${meta.maintainer}`,
				email: `${meta.maintainer_email}`
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
