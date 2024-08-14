import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';

const router = express.Router();

router.delete(`/api/v2/note`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let noteFromDb = await db.getRepository('note').findOne({
				where: {
					id: JSON.parse(req.body).id
				}
			});

			if (noteFromDb) {
				if (noteFromDb.author === authRes.grabbedUserAuth.user) {
					await db.getRepository('note').delete(noteFromDb.id);
					return res.status(200).json({
						message: 'Note deleted.'
					});
				} else {
					return res.status(401).json({
						message: "You cannot delete other people's notes."
					});
				}
			} else {
				return res.status(404).json({
					message: 'Note not found.'
				});
			}
		} else {
			return res.status(400).json({
				message: 'Note ID required.'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
