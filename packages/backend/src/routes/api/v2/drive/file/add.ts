import express from 'express';

import verifyToken from '../../../../../utils/auth/verifyToken.js';
import db from '../../../../../utils/database.js';

const router = express.Router();

const safeForUpload = ['image/png', 'image/jpeg'];

router.post(`/api/v2/drive/file`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

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
					console.log(req.headers['content-type']);
					console.log(req.body);

					if (safeForUpload.includes(req.headers['content-type'])) {
						/*
							driveFileToInsert['id'] = uuidv4();
					driveFileToInsert['ap_id'] = sanitize(attachment.url);
					driveFileToInsert['user'] = sanitize(author.id);
					driveFileToInsert['note'] = sanitize(note.id);
					driveFileToInsert['created_at'] = sanitize(note.created_at);
					driveFileToInsert['updated_at'] = sanitize(note.created_at);
					driveFileToInsert['type'] = sanitize(attachment.mediaType);
					driveFileToInsert['src'] = sanitize(attachment.url);
					driveFileToInsert['alt'] = sanitize(attachment.summary);

					await db.getRepository('drive_file').insert(driveFileToInsert);
						*/
						res.status(200).json({
							message: 'File uploaded'
						});
					} else {
						res.status(400).json({
							message: 'Unsafe file type.'
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
