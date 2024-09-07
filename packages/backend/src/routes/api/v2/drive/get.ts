import express from 'express';
import db from '../../../../utils/database.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.get(`/api/v2/drive`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		if (authRes.grabbedUserAuth.user) {
			let grabbedUser = await db.getRepository('user').findOne({
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
					let grabbedFiles = await db
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
