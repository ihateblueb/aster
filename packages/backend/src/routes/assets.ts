import express from 'express';

import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use(
	`/assets/twemoji`,
	express.static(
		path.resolve(
			__dirname,
			'..',
			'..',
			'..',
			'frontend',
			'node_modules',
			'@discordapp',
			'twemoji',
			'dist'
		)
	)
);

export default router;
