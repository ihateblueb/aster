import plugin from 'fastify-plugin';

import ConfigService from '../../../services/ConfigService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Federation']
	} as const;

	fastify.get(
		'/.well-known/host-meta',
		{
			schema: schema
		},
		async (req, reply) => {
			if (
				req.headers.accept &&
				req.headers.accept.includes('application/xrd+xml')
			) {
				return reply
					.status(200)
					.header('Content-Type', 'application/xrd+xml')
					.send(
						`<XRD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
					<Link rel="lrdd" template="${new URL(ConfigService.url).href}.well-known/webfinger?resource={uri}" />
				</XRD>`
					);
			} else {
				return reply
					.status(200)
					.header('Content-Type', 'application/jrd+json')
					.send({
						links: [
							{
								rel: 'lrdd',
								type: 'application/jrd+json',
								template:
									new URL(ConfigService.url).href +
									'.well-known/webfinger?resource={uri}'
							}
						]
					});
			}
		}
	);
});
