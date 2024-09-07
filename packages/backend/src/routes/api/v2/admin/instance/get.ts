import express from 'express';

import db from '../../../../../utils/database.js';
import admin from '../../../../admin.js';

const router = express.Router();

router.get(`/api/v2/admin/instance/:host`, admin, async (req, res) => {
	let grabbedInstance = await db.getRepository('instance').findOne({
		where: {
			host: req.params.host
		}
	});

	if (grabbedInstance) {
		res.status(200).json(grabbedInstance);
	} else {
		res.status(404).json({
			message: 'No instance found'
		});
	}
});

export default router;
