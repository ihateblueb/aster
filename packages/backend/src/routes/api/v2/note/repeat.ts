import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../../utils/database.js';
import config from '../../../../utils/config.js';
import OAnnounce from '../../../../outgoing/announce.js';
import notification from '../../../../utils/notification.js';
import OUndoAnnounce from '../../../../outgoing/undo/announce.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/repeat`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			let grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: req.params.noteid
				}
			});

			if (grabbedNote) {
				let grabbedPreviousRepeat = await db
					.getRepository('repeat')
					.findOne({
						where: {
							note: req.params.noteid,
							author: authRes.grabbedUserAuth.user
						}
					});

				if (grabbedPreviousRepeat) {
					await db.getRepository('repeat').delete({
						note: req.params.noteid,
						author: authRes.grabbedUserAuth.user
					});

					OUndoAnnounce(
						authRes.grabbedUserAuth.user,
						grabbedPreviousRepeat
					);

					return res.status(200).json({
						message: 'Undid repeat'
					});
				} else {
					const repeatId = uuidv4();

					let repeatToInsert = {};

					repeatToInsert['id'] = repeatId;
					repeatToInsert['ap_id'] =
						`${config.get().url}repeats/${repeatId}`;
					repeatToInsert['created_at'] = new Date(
						Date.now()
					).toISOString();
					repeatToInsert['visibility'] = 'public';
					repeatToInsert['author'] = authRes.grabbedUserAuth.user;
					repeatToInsert['local'] = true;
					repeatToInsert['note'] = req.params.noteid;

					console.log(repeatToInsert);

					await db.getRepository('repeat').insert(repeatToInsert);

					OAnnounce(authRes.grabbedUserAuth.user, repeatToInsert);

					if (
						grabbedNote.local &&
						authRes.grabbedUserAuth.user !== grabbedNote.author
					) {
						await notification.create(
							grabbedNote.author,
							authRes.grabbedUserAuth.user,
							'repeat',
							grabbedNote.id
						);
					}

					return res.status(200).json({
						message: 'Note repeated'
					});
				}
			} else {
				return res.status(404).json({
					message: 'Note not found'
				});
			}
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'Note ID parameter required'
		});
	}
});

export default router;
