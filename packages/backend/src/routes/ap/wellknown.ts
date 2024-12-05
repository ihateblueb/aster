import express from 'express';

import UserService from '../../services/UserService.js';
import oapi from '../../utils/apidoc.js';
import config from '../../utils/config.js';
import logger from '../../utils/logger.js';

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
					'application/activity+json': {},
					'application/ld+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		if (
			req.headers.accept &&
			req.headers.accept.includes('application/ld+json')
		) {
			res.setHeader('Content-Type', 'application/ld+json');
		} else {
			res.setHeader('Content-Type', 'application/activity+json');
		}

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
	}
);

router.get(
	['/.well-known/host-meta'],
	oapi.path({
		description: 'Fetch host meta',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return host meta.',
				content: {
					'application/xrd+xml': {},
					'application/jrd+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		if (
			req.headers.accept &&
			req.headers.accept.includes('application/xrd+xml')
		) {
			res.setHeader('Content-Type', 'application/xrd+xml');
			return res.status(200).send(
				`<XRD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
					<Link rel="lrdd" template="${new URL(config.url).href}.well-known/webfinger?resource={uri}" />
				</XRD>`
			);
		} else {
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
		}
	}
);

router.get(
	'/.well-known/webfinger',
	oapi.path({
		description: 'Fetch apId of user from handle',
		tags: ['Federation'],
		parameters: [
			{
				name: 'resource',
				in: 'query'
			}
		],
		responses: {
			200: {
				description: 'Return apId of user.',
				content: {
					'application/jrd+json': {},
					'application/xrd+xml': {}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		if (!req.query.resource) return res.status(400).send();

		const resource = req.query.resource
			.toString()
			.replace('acct:@', '')
			.replace('acct:', '')
			.replace('@' + new URL(config.url).host, '')
			.replace('@', '');

		logger.debug('webfinger', 'resource: ' + resource);

		const user = await UserService.get({
			local: true,
			username: resource
		});

		if (!user || user.suspended || !user.activated)
			return res.status(404).send();

		// todo: /authorize-follow?acct={uri}
		if (
			req.headers.accept &&
			req.headers.accept.includes('application/xrd+xml')
		) {
			res.setHeader('Content-Type', 'application/xrd+xml');

			return res.status(200).send(
				`<XRD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
					<Subject>acct:${user.username}@${new URL(config.url).host}</Subject>
					<Alias>${new URL(config.url).href}users/${user.id}</Alias>
					<Alias>${new URL(config.url).href}@${user.username}</Alias>
					<Link rel="self" type="application/activity+json" href="${new URL(config.url).href}users/${user.id}" />
					<Link rel="http://webfinger.net/rel/profile-page" type="text/html" href="${new URL(config.url).href}users/${user.id}" />
				</XRD>`
			);
		} else {
			res.setHeader('Content-Type', 'application/jrd+json');

			return res.status(200).json({
				subject: `acct:${user.username}@${new URL(config.url).host}`,
				aliases: [
					`${new URL(config.url).href}users/${user.id}`,
					`${new URL(config.url).href}@${user.username}`
				],
				links: [
					{
						rel: 'self',
						type: 'application/activity+json',
						href: `${new URL(config.url).href}users/${user.id}`
					},
					{
						rel: 'http://webfinger.net/rel/profile-page',
						type: 'text/html',
						href: `${new URL(config.url).href}users/${user.id}`
					}
				]
			});
		}
	}
);

export default router;
