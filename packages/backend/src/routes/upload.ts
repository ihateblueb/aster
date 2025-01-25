import * as fs from 'node:fs';
import * as stream from 'node:stream';
import * as util from 'node:util';

import plugin from 'fastify-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import ConfigService from '../services/ConfigService.js';
import DriveService from '../services/DriveService.js';
import logger from '../utils/logger.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Miscellaneous']
	} as const;

	fastify.post(
		'/upload',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const pump = util.promisify(stream.pipeline);

			const __dirname = dirname(fileURLToPath(import.meta.url));
			const dir = __dirname + '/../../../../uploads/' + req.auth.user.id;

			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

			const parts = req.files();
			for await (const part of parts) {
				let fileSrc =
					ConfigService.url.href +
					'uploads/' +
					req.auth.user.id +
					'/' +
					part.filename;

				logger.debug('upload', 'created file ' + fileSrc);

				await DriveService.create(
					fileSrc,
					part.mimetype,
					undefined,
					false,
					req.auth.user.id
				);

				await pump(
					part.file,
					fs.createWriteStream(dir + '/' + part.filename)
				);
			}

			return reply.status(200).send();
		}
	);
});
