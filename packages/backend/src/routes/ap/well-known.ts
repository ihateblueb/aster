import express from 'express';
const router = express.Router();

import config from '../../utils/config.js';
import db from '../../utils/database.js';

// nodeinfo
router.get('/.well-known/nodeinfo', (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');
	res.json({
		links: [
			{
				rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
				href: `${config.url}nodeinfo/2.0`
			}
		]
	});
});

// host-meta
router.get('/.well-known/host-meta', (req, res) => {
	res.setHeader('Content-Type', 'application/xrd+xml');
	res.send(
		'<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0"><Link rel="lrdd" type="application/xrd+xml" template="' +
			config.url +
			'.well-known/webfinger?resource={uri}"/></XRD>'
	);
});

// webfinger
router.get('/.well-known/webfinger', async (req, res) => {
	if (req.query.resource) {
		res.setHeader('Content-Type', 'application/activity+json');

		if (req.query.resource.startsWith('acct:')) {
			var grabbedUser = await db.getRepository('users').findOne({
				where: {
					username: req.query.resource
						.replace('acct:', '')
						.split('@')[0]
				}
			});

			res.json({
				subject: `acct:${grabbedUser.username}@${config.url
					.replace('https://', '')
					.replace('http://', '')
					.replace('/', '')}`,
				links: [
					{
						rel: 'self',
						type: 'application/activity+json',
						href: `${config.url}users/${grabbedUser.id}`
					}
				]
			});
		} else {
			res.send();
		}
	} else {
		res.send();
	}
});

export default router;
