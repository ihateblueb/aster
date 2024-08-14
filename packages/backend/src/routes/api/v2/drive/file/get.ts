import express from 'express';

import verifyToken from '../../../../../utils/auth/verifyToken.js';
import db from '../../../../../utils/database.js';

const router = express.Router();

router.get(`/api/v2/drive/file/:id`, async (req, res) => {
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
					let grabbedFile = await db
						.getRepository('drive_file')
						.findOne({
							where: {
								id: req.params.id
							}
						});

					if (grabbedFile) {
						if (grabbedFile.user === grabbedUser.id) {
							res.status(200).json(grabbedFile);
						} else {
							// as to not reveal the file exists.
							// it doesnt matter that much but like. just to be safe. yk.
							return res.status(404).json({
								message: 'File not found'
							});
						}
					} else {
						return res.status(404).json({
							message: 'File not found'
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
});

export default router;
