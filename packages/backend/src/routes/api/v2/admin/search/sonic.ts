import express from 'express';

import config from '../../../../../utils/config.js';
import db from '../../../../../utils/database.js';
import ingest from '../../../../../utils/sonic/ingest.js';
import Logger from '../../../../../utils/logger.js';
import admin from '../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/sonic/index`, admin, async (req, res) => {
	let grabbedNotes = await db.getRepository('note').find({
		where: {
			visibility: 'public'
		}
	});

	await grabbedNotes.forEach(async (note) => {
		if (note.cw) {
			await ingest
				.push(
					config.get().sonic.collectionPrefix + '_cw',
					config.get().sonic.bucket,
					note.id,
					note.cw
				)
				.then(() => {
					Logger.info('sonic', 'pushed ' + note.id + ' cw to sonic');
				})
				.catch((e) => {
					Logger.error('sonic', e);
					res.status(500).json({
						message: 'Failed to index note cw'
					});
				});
		}

		await ingest
			.push(
				config.get().sonic.collectionPrefix + '_content',
				config.get().sonic.bucket,
				note.id,
				note.content
			)
			.then(() => {
				Logger.info('sonic', 'pushed ' + note.id + ' content to sonic');
			})
			.catch((e) => {
				Logger.error('sonic', e);
				res.status(500).json({
					message: 'Failed to index note content'
				});
			});
	});

	let grabbedUsers = await db.getRepository('user').find({
		where: {
			discoverable: true
		}
	});

	await grabbedUsers.forEach(async (user) => {
		if (user.bio) {
			await ingest
				.push(
					config.get().sonic.collectionPrefix + '_bio',
					config.get().sonic.bucket,
					user.id,
					user.bio
				)
				.then(() => {
					Logger.info('sonic', 'pushed ' + user.id + ' bio to sonic');
				})
				.catch((e) => {
					Logger.error('sonic', e);
					res.status(500).json({
						message: 'Failed to index user'
					});
				});
		}
	});

	res.status(200).json({
		message: 'Indexed all content'
	});
});

router.get(`/api/v2/admin/sonic/flush`, async (req, res) => {
	await ingest
		.flushc(config.get().sonic.collectionPrefix + '_cw')
		.then(() => {
			Logger.info('sonic', 'flushed sonic cw collection');
		})
		.catch((e) => {
			Logger.error('sonic', e);
			res.status(500).json({
				message: 'Failed to flush note cw'
			});
		});

	await ingest
		.flushc(config.get().sonic.collectionPrefix + '_content')
		.then(() => {
			Logger.info('sonic', 'flushed sonic content collection');
		})
		.catch((e) => {
			Logger.error('sonic', e);
			res.status(500).json({
				message: 'Failed to flush note content'
			});
		});

	await ingest
		.flushc(config.get().sonic.collectionPrefix + '_bio')
		.then(() => {
			Logger.info('sonic', 'flushed sonic bio collection');
		})
		.catch((e) => {
			Logger.error('sonic', e);
			res.status(500).json({
				message: 'Failed to flush user bio'
			});
		});

	res.status(200).json({
		message: 'Flushed all content'
	});
});

export default router;
