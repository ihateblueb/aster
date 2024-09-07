import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import OLike from '../../../../outgoing/like.js';
import config from '../../../../utils/config.js';
import OUndoLike from '../../../../outgoing/undo/like.js';
import UserAuthService from '../../../../services/UserAuthService.js';
import NotificationService from '../../../../services/NotificationService.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/like`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger.debug('note', 'note like requested');

			let grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: req.params.noteid
				}
			});

			if (grabbedNote) {
				let grabbedPreviousLike = await db
					.getRepository('note_like')
					.findOne({
						where: {
							note: req.params.noteid,
							user: authRes.grabbedUserAuth.user
						}
					});

				if (grabbedPreviousLike) {
					await db.getRepository('note_like').delete({
						note: req.params.noteid,
						user: authRes.grabbedUserAuth.user
					});

					let grabbedNote = await db.getRepository('note').findOne({
						where: {
							id: req.params.noteid
						}
					});

					await OUndoLike(
						grabbedPreviousLike.id,
						authRes.grabbedUserAuth.user,
						grabbedNote.author,
						grabbedNote
					);

					return res.status(200).json({
						message: 'Note unliked'
					});
				} else {
					const likeId = uuidv4();

					await db.getRepository('note_like').insert({
						id: likeId,
						ap_id:
							new URL(config.get().url).href +
							'activities/' +
							likeId,
						note: req.params.noteid,
						created_at: new Date(Date.now()).toISOString(),
						user: authRes.grabbedUserAuth.user
					});

					let grabbedAuthor = await db.getRepository('user').findOne({
						where: {
							id: grabbedNote.user
						}
					});

					await OLike(
						likeId,
						authRes.grabbedUserAuth.user,
						grabbedAuthor,
						grabbedNote
					);

					if (grabbedAuthor) {
						if (grabbedAuthor.local) {
							await NotificationService.create(
								grabbedNote.author,
								authRes.grabbedUserAuth.user,
								'like',
								grabbedNote.id
							);
						}
					}

					return res.status(200).json({
						message: 'Note liked'
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
