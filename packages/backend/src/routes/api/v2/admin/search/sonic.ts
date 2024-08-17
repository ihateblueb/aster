import express from 'express';

import config from '../../../../../utils/config.js';
import db from '../../../../../utils/database.js';
import ingest from '../../../../../utils/sonic/ingest.js';
import logger from '../../../../../utils/logger.js';

const router = express.Router();

router.get(`/api/v2/admin/sonic/index`, async (req, res) => {
	let grabbedNotes = await db.getRepository('note').find();

	await grabbedNotes.forEach(async (note) => {
		if (note.visibility === 'public') {
			await ingest
				.push(
					config.sonic.collection,
					config.sonic.bucket,
					note.id,
					note.content
				)
				.then(() => {
					logger('info', 'sonic', 'pushed ' + note.id + ' to sonic');
				})
				.catch((e) => {
					logger('error', 'sonic', JSON.stringify(e));
					res.status(500).json({
						message: 'Failed to index notes'
					});
				});
		}
	});

	res.status(200).json({
		message: 'Indexed all notes'
	});
});

export default router;
