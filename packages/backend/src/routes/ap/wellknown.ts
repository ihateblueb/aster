import express from 'express';

import oapi from '../../utils/apidoc.js';
import config from '../../utils/config.js';

import UserService from '../../services/UserService.js';

const router = express.Router();

router.get(
	'/.well-known/nodeinfo',
	oapi.path({
		description: 'List supported nodeinfo links',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return nodeinfo links.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		res.setHeader('Content-Type', 'application/activity+json');

		return res.status(200).json({
			links: [
				{
					rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
					href: new URL(config.url).href + 'nodeinfo/2.1'
				},
				{
					rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
					href: new URL(config.url).href + 'nodeinfo/2.0'
				}
			]
		});
	});

router.get(
	['/.well-known/host-meta', '/.well-known/host-meta.json'],
	oapi.path({
		description: 'Fetch host meta',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return host meta.',
				content: {
					'application/jrd+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		res.setHeader('Content-Type', 'application/jrd+json');
		return res.status(200).json({
			links: [
				{
					rel: 'lrdd',
					type: 'application/jrd+json',
					template:
						new URL(config.url).href +
						'.well-known/webfinger?resource={uri}'
				}
			]
		});
	});

router.get(
	'/.well-known/webfinger',
	oapi.path({
		description: 'Fetch apId of user from handle',
		tags: ['Federation'],
		parameters: [{
			name: 'resource',
			in: 'query',
		}],
		responses: {
			200: {
				description: 'Return apId of user.',
				content: {
					'application/jrd+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'application/jrd+json');

		if (!req.query.resource || !req.query.resource.startsWith('acct:')) return res.status(400).send();

		let user = await UserService.get({
			local: true,
			username: req.query.resource.replace('acct:', '').split('@')[1]
		})

		if (!user || user.suspended || !user.activated) return res.status(404).send();

		return res.status(200).json({
			subject: `acct:${user.username}@${new URL(config.url).host}`,
			links: [
				{
					rel: 'self',
					type: 'application/activity+json',
					href: `${new URL(config.url).href}users/${user.id}`
				}
			]

		});
	});

export default router;
