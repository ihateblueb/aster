import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import Logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';
import getSigned from '../../../../utils/ap/getSigned.js';

const router = express.Router();

router.get('/api/v2/user/:userid/raw', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	} else {
		let grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: req.params.userid
			}
		});

		if (grabbedUser) {
			if (grabbedUser.suspended) {
				return res.status(410).json({
					message: 'User suspended'
				});
			} else if (grabbedUser.deactivated) {
				return res.status(410).json({
					message: 'User deactivated'
				});
			} else {
				let grabbedRawUser = await await getSigned(grabbedUser.ap_id);

				if (grabbedRawUser) {
					return res.status(200).json(grabbedRawUser);
				} else {
					return res.status(500).json({
						message: 'Failed to grab note'
					});
				}
			}
		} else {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
	}
});

export default router;
