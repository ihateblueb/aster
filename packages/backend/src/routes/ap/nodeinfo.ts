import express from 'express';

import pkg from '../../../../../package.json' with { type: 'json' };
import db from '../../utils/database.js';

const router = express.Router();

router.get('/nodeinfo/2.0', async (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');

	let userCount = await db.getRepository('user').count({
		where: {
			local: true
		}
	});

	let noteCount = await db.getRepository('note').count({
		where: {
			local: true
		}
	});

	const metaDb = await db.getRepository('meta').find();
	const meta = metaDb[0];

	let nodeinfoJson = {
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
			maintainer: {}
		},
		usage: {
			users: {
				total: `${userCount}`
			},
			localPosts: `${noteCount}`
		}
	};

	if (meta) {
		nodeinfoJson.metadata['nodeName'] = meta.name ? meta.name : 'Aster';
		nodeinfoJson.metadata['nodeDescription'] = meta.description_long
			? meta.description_long
			: 'A fediverse instance running Aster';
		nodeinfoJson.metadata['themeColor'] = meta.color
			? meta.color
			: '#9c8cff';

		nodeinfoJson.metadata.maintainer['name'] = meta.maintainer;
		nodeinfoJson.metadata.maintainer['email'] = meta.maintainer;
	}

	res.status(200).json(nodeinfoJson);
});

export default router;
