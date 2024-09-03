import express from 'express';

import db from '../../../../../utils/database.js';
import admin from '../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/instances`, admin, async (req, res) => {
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
