import express from 'express';
import db from '../../../../utils/database.js';
import deleteNote from '../../../../utils/actions/delete/note.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.delete(`/api/v2/note`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: JSON.parse(req.body).id
				}
			});

			let grabbedDeleter = await db.getRepository('user').findOne({
				where: {
					id: authRes.grabbedUserAuth.user
				}
			});

			if (grabbedNote) {
				if (
					grabbedNote.author === authRes.grabbedUserAuth.user ||
					grabbedDeleter.admin ||
					grabbedDeleter.mod
				) {
					await deleteNote(grabbedNote.ap_id);

					/*
					if (grabbedNote.local) {
						ODelete(grabbedNote.ap_id, grabbedNote.author)
					}
					*/

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
