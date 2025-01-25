import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ConfigService from '../../../services/ConfigService.js';
import UserService from '../../../services/UserService.js';
import logger from '../../../utils/logger.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation'],
		querystring: {
			type: 'object',
			properties: {
				resource: { type: 'string', nullable: false }
			}
		}
	} as const;

	fastify.get<{
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/.well-known/webfinger',
		{
			schema: schema
		},
		async (req, reply) => {
			const resource = req.query.resource
				.toString()
				.replace('acct:@', '')
				.replace('acct:', '')
				.replace('@' + new URL(ConfigService.url).host, '')
				.replace('@', '');

			logger.debug('webfinger', 'resource: ' + resource);

			const user = await UserService.get({
				local: true,
				username: resource
			});

			if (!user || user.suspended || !user.activated)
				return reply.status(404).send();

			// todo: /authorize-follow?acct={uri}
			if (
				req.headers.accept &&
				req.headers.accept.includes('application/xrd+xml')
			) {
				return reply
					.status(200)
					.header('Content-Type', 'application/xrd+xml')
					.send(
						`<XRD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
					<Subject>acct:${user.username}@${new URL(ConfigService.url).host}</Subject>
					<Alias>${new URL(ConfigService.url).href}users/${user.id}</Alias>
					<Alias>${new URL(ConfigService.url).href}@${user.username}</Alias>
					<Link rel="self" type="application/activity+json" href="${ConfigService.url.href}users/${user.id}" />
					<Link rel="http://webfinger.net/rel/profile-page" type="text/html" href="${ConfigService.url.href}users/${user.id}" />
				</XRD>`
					);
			} else {
				return reply
					.status(200)
					.header('Content-Type', 'application/jrd+json')
					.send({
						subject: `acct:${user.username}@${new URL(ConfigService.url).host}`,
						aliases: [
							`${new URL(ConfigService.url).href}users/${user.id}`,
							`${new URL(ConfigService.url).href}@${user.username}`
						],
						links: [
							{
								rel: 'self',
								type: 'application/activity+json',
								href: `${new URL(ConfigService.url).href}users/${user.id}`
							},
							{
								rel: 'http://webfinger.net/rel/profile-page',
								type: 'text/html',
								href: `${new URL(ConfigService.url).href}users/${user.id}`
							}
						]
					});
			}
		}
	);
});
