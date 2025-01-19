import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import util from 'node:util';

import express from 'express';
import formidable from 'formidable';
import os from 'os';

import AuthService from '../../services/AuthService.js';
import ConfigService from '../../services/ConfigService.js';
import DriveService from '../../services/DriveService.js';
import oapi from '../../utils/apidoc.js';
import logger from '../../utils/logger.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmpdir = os.tmpdir() + '/aster/' + ConfigService.url.host + '/uploads/';

router.post(
	'/upload',
	oapi.path({
		description: 'Upload a file',
		tags: ['Miscellaneous'],
		requestBody: {
			content: {
				'multipart/form-data': {}
			}
		},
		responses: {
			200: {
				content: {
					'application/json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		const auth = await AuthService.verify(req.headers.authorization);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		const dir = __dirname + '/../../../../../uploads/' + auth.user.id;

		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		if (!fs.existsSync(tmpdir)) fs.mkdirSync(tmpdir, { recursive: true });

		const form = formidable({
			uploadDir: dir,
			encoding: 'utf-8',
			keepExtensions: true,
			multiples: true
		});

		const [fields, files] = await form.parse(req);

		if (files && files.files)
			for (const file of files.files) {
				let fileSrc =
					ConfigService.url.href +
					'uploads/' +
					auth.user.id +
					'/' +
					file.newFilename;

				logger.debug('upload', 'created file ' + fileSrc);

				await DriveService.create(
					fileSrc,
					undefined,
					false,
					auth.user.id
				);
			}

		return res.status(200).send();
	}
);

export default router;
