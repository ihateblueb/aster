import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import verifyToken from '../../../../../utils/auth/verifyToken.js';
import db from '../../../../../utils/database.js';
import config from '../../../../../utils/config.js';

import calculateDimensions from '../../../../../utils/media/calculateDimensions.js';
import generateThumbnail from '../../../../../utils/media/generateThumbnail.js';

const router = express.Router();

const safeForUpload = [
	'image/png',
	'image/gif',
	'image/jpeg',
	'image/webp',
	'image/avif',
	'image/apng',
	'image/bmp',
	'image/tiff',
	'image/x-icon',
	'image/jxl',

	'video/ogg',
	'video/quicktime',
	'video/mp4',
	'video/x-m4v',
	'video/3gpp',
	'video/3gpp2',
	'video/mpeg',
	'video/webm',
	'video/x-matroska',

	'audio/opus',
	'audio/ogg',
	'audio/mp4',
	'audio/x-m4a',
	'audio/mpeg',
	'audio/webm',
	'audio/aac',
	'audio/flac',
	'audio/wav',
	'audio/x-flac',
	'audio/vnd.wave',

	'application/ogg',
	'application/json'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post(`/api/v2/drive/file/:name`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		if (authRes.grabbedUserAuth.user) {
			var grabbedUser = await db.getRepository('user').findOne({
				where: {
					id: authRes.grabbedUserAuth.user
				}
			});

			if (grabbedUser) {
				if (grabbedUser.suspended) {
					res.status(401).json({
						message: 'Account suspended'
					});
				} else if (grabbedUser.deactivated) {
					res.status(401).json({
						message: 'Account deactivated'
					});
				} else {
					if (req.params.name) {
						console.log(req.headers['content-type']);
						console.log(req.body);

						if (
							safeForUpload.includes(req.headers['content-type'])
						) {
							const fileId = uuidv4();

							if (
								!fs.existsSync(
									path.resolve(
										__dirname,
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'uploads',
										grabbedUser.id
									)
								)
							) {
								fs.mkdirSync(
									path.resolve(
										__dirname,
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'..',
										'uploads',
										grabbedUser.id
									),
									{ recursive: true }
								);
							}

							fs.writeFileSync(
								path.resolve(
									__dirname,
									'..',
									'..',
									'..',
									'..',
									'..',
									'..',
									'..',
									'..',
									'uploads',
									grabbedUser.id,
									`${fileId}.${req.params.name.match(/(.*)\.(.*)/)[2]}`
								),
								req.body
							);

							/*
							let dimensions = calculateDimensions(
								new URL(config.url).href +
									'uploads/' +
									grabbedUser.id +
									'/' +
									fileId +
									'.' +
									req.params.name.match(/(.*)\.(.*)/)[2],
								req.headers['content-type']
							);
							*/

							let thumbnail = await generateThumbnail(
								req.body,
								req.headers['content-type'],
								grabbedUser.id,
								fileId
							);

							console.log(thumbnail);

							let driveFileToInsert = {};

							driveFileToInsert['id'] = fileId;
							driveFileToInsert['ap_id'] =
								new URL(config.url).href +
								'uploads/' +
								grabbedUser.id +
								'/' +
								fileId +
								'.' +
								req.params.name.match(/(.*)\.(.*)/)[2];
							driveFileToInsert['name'] =
								fileId +
								'.' +
								req.params.name.match(/(.*)\.(.*)/)[2];
							driveFileToInsert['user'] = grabbedUser.id;
							driveFileToInsert['created_at'] = new Date(
								Date.now()
							).toISOString();
							driveFileToInsert['updated_at'] = new Date(
								Date.now()
							).toISOString();
							driveFileToInsert['type'] =
								req.headers['content-type'];
							driveFileToInsert['src'] =
								new URL(config.url).href +
								'uploads/' +
								grabbedUser.id +
								'/' +
								fileId +
								'.' +
								req.params.name.match(/(.*)\.(.*)/)[2];
							driveFileToInsert['thumbnail'] =
								new URL(config.url).href + thumbnail.url;
							driveFileToInsert['blurhash'] = thumbnail.blurhash;
							driveFileToInsert['alt'] = '';

							console.log(driveFileToInsert);

							/*
							await db
								.getRepository('drive_file')
								.insert(driveFileToInsert);
							*/

							res.status(200).json({
								message: 'File uploaded'
							});
						} else {
							console.log(req.headers['content-type']);

							res.status(400).json({
								message: 'Unsafe file type.'
							});
						}
					} else {
						res.status(400).json({
							message: 'Name parameter required'
						});
					}
				}
			} else {
				return res.status(404).json({
					message: 'User not found'
				});
			}
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
