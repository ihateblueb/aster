import express from 'express';

import config from '../../../../../utils/config.js';
import db from '../../../../../utils/database.js';
import ingest from '../../../../../utils/sonic/ingest.js';
import Logger from '../../../../../utils/logger.js';
import admin from '../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/federation`, admin, async (req, res) => {
	Logger.debug('admin', 'get federation');

	let grabbedInstances = await db
		.getRepository('instance')
		.createQueryBuilder()
		.orderBy('user_count', 'DESC')
		.getMany();

	if (grabbedInstances) {
		res.status(200).json(grabbedInstances);
	} else {
		res.status(404).json({
			message: 'No instances found'
		});
	}
});

export default router;
