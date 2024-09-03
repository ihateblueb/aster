import express from 'express';

import db from '../../../../../../utils/database.js';
import admin from '../../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/instances/blocked`, admin, async (req, res) => {
	let grabbedBlockedInstances = await db
		.getRepository('moderated_instance')
		.createQueryBuilder()
		.where({
			blocked: true
		})
		.getMany();

	if (grabbedBlockedInstances) {
		res.status(200).json(grabbedBlockedInstances);
	} else {
		res.status(404).json({
			message: 'No blocked instances found'
		});
	}
});

export default router;
