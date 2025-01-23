import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

import ConfigService from '../../../services/ConfigService.js';
import UserService from '../../../services/UserService.js';
import logger from '../../../utils/logger.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation']
	} as const;

	fastify.get(
		'/.well-known/nodeinfo',
		{
			schema: schema
		},
		async (req, reply) => {
			if (
				req.headers.accept &&
				req.headers.accept.includes('application/ld+json')
			) {
				reply.header('Content-Type', 'application/ld+json');
			} else {
				reply.header('Content-Type', 'application/activity+json');
			}

			return reply.status(200).send({
				links: [
					{
						rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
						href: new URL(ConfigService.url).href + 'nodeinfo/2.1'
					},
					{
						rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
						href: new URL(ConfigService.url).href + 'nodeinfo/2.0'
					}
				]
			});
		}
	);
});
