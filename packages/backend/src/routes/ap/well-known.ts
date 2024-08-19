import express from 'express';

import config from '../../utils/config.js';
import db from '../../utils/database.js';

const router = express.Router();

// nodeinfo
router.get('/.well-known/nodeinfo', (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');
	res.json({
		links: [
			{
				rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
				href: `${config.get().url}nodeinfo/2.0`
			}
		]
	});
});

// host-meta
router.get(
	['/.well-known/host-meta', '/.well-known/host-meta.json'],
	(req, res) => {
		res.setHeader('Content-Type', 'application/jrd+json');
		res.status(200).json({
			links: [
				{
					rel: 'lrdd',
					type: 'application/jrd+json',
					template:
						config.get().url +
						'.well-known/webfinger?resource={uri}'
				}
			]
		});
	}
);

// webfinger
router.get('/.well-known/webfinger', async (req, res) => {
	if (req.query.resource) {
		res.setHeader('Content-Type', 'application/jrd+json');
		if (req.query.resource.startsWith('acct:')) {
			let grabbedUser = await db
				.getRepository('user')
				.createQueryBuilder()
				.where({
					username: req.query.resource
						.replace('acct:', '')
						.split('@')[1],
					local: true
				})
				.getOne();

			if (grabbedUser) {
				res.status(200).json({
					subject: `acct:${grabbedUser.username}@${new URL(config.get().url).host}`,
					links: [
						{
							rel: 'self',
							type: 'application/activity+json',
							href: `${config.get().url}users/${grabbedUser.id}`
						}
					]
				});
			} else {
				res.send();
			}
		} else {
			let grabbedUser = await db
				.getRepository('user')
				.createQueryBuilder()
				.where({
					ap_id: req.query.resource,
					local: true
				})
				.getOne();

			if (grabbedUser) {
				res.status(200).json({
					subject: `acct:${grabbedUser.username}@${new URL(config.get().url).host}`,
					links: [
						{
							rel: 'self',
							type: 'application/activity+json',
							href: `${config.get().url}users/${grabbedUser.id}`
						}
					]
				});
			} else {
				res.send();
			}
		}
	} else {
		res.send();
	}
});

export default router;
