import express from 'express';

import verifyToken from '../../../../../utils/auth/verifyToken.js';
import db from '../../../../../utils/database.js';
import sanitize from '../../../../../utils/sanitize.js';

const router = express.Router();

router.patch(`/api/v2/drive/file/:id`, async (req, res) => {
	if (req.params.id) {
		let authRes = await verifyToken(req);

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
						if (req.body) {
							let updatedFile = {};

							if (JSON.parse(req.body).name) {
								updatedFile['name'] = sanitize(
									JSON.parse(req.body).name
								);
							}

							if (JSON.parse(req.body).alt) {
								updatedFile['alt'] = sanitize(
									JSON.parse(req.body).alt
								);
							}

							await db
								.getRepository('drive_file')
								.update({ id: req.params.id }, updatedFile);

							let grabbedUpdatedFile = await db
								.getRepository('drive_file')
								.findOne({
									where: {
										id: req.params.id
									}
								});

							return res.status(200).json({
								message: 'Updated file',
								file: grabbedUpdatedFile
							});
						} else {
							return res.status(400).json({
								message: 'Body required'
							});
						}
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
	} else {
		return res.status(400).json({
			message: 'File id required'
		});
	}
});

export default router;
