import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import createNotification from '../../../../utils/createNotification.js';
import OLike from '../../../../outgoing/like.js';
import config from '../../../../utils/config.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/like`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note like requested');

			var grabbedNote = await db.getRepository('note').findOne({
				where: {
					id: req.params.noteid
				}
			});

			if (grabbedNote) {
				const likeId = uuidv4();

				await db.getRepository('note_like').insert({
					id: likeId,
					ap_id: new URL(config.url).href + 'activities/' + likeId,
					note: req.params.noteid,
					created_at: new Date(Date.now()).toISOString(),
					user: authRes.grabbedUserAuth.user
				});

				var grabbedAuthor = await db.getRepository('user').findOne({
					where: {
						id: grabbedNote.user
					}
				});

				OLike(
					likeId,
					authRes.grabbedUserAuth.user,
					grabbedAuthor,
					grabbedNote
				);

				if (grabbedAuthor) {
					if (grabbedAuthor.local) {
						await createNotification(
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
