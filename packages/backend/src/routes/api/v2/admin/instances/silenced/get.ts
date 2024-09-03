import express from 'express';

import db from '../../../../../../utils/database.js';
import admin from '../../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/instances/silenced`, admin, async (req, res) => {
	let grabbedSilencedInstances = await db
		.getRepository('moderated_instance')
		.createQueryBuilder()
		.where({
			silenced: true
		})
		.getMany();

	if (grabbedSilencedInstances) {
		res.status(200).json(grabbedSilencedInstances);
	} else {
		res.status(404).json({
			message: 'No silenced instances found'
		});
	}
});

export default router;
