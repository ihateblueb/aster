import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';

const router = express.Router();

router.get(`/api/v2/drive`, async (req, res) => {
	var authRes = await verifyToken(req);

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
					var grabbedFiles = await db
						.getRepository('drive_file')
						.find({
							where: {
								user: grabbedUser.id
							}
						});

					res.status(200).json(grabbedFiles);
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
