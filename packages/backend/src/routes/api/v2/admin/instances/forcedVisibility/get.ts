import express from 'express';

import db from '../../../../../../utils/database.js';
import admin from '../../../../../admin.js';
import { In } from 'typeorm';

const router = express.Router();

router.get(
	`/api/v2/admin/instances/forcedVisibility`,
	admin,
	async (req, res) => {
		let grabbedForcedVisibilityInstances = await db
			.getRepository('moderated_instance')
			.createQueryBuilder()
			.where({
				forcedVisibility: In([
					'public',
					'unlisted',
					'followers',
					'direct'
				])
			})
			.getMany();

		if (grabbedForcedVisibilityInstances) {
			res.status(200).json(grabbedForcedVisibilityInstances);
		} else {
			res.status(404).json({
				message: 'No forced visibility instances found'
			});
		}
	}
);

export default router;
