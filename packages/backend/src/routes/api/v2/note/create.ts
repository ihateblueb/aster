import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import config from '../../../../utils/config.js';
import sanitize from '../../../../utils/sanitize.js';
import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import ApNote from '../../../../constructors/ApNote.js';
import OCreate from '../../../../outgoing/create.js';

const router = express.Router();

router.post(`/api/v2/note`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		const noteId = uuidv4();

		var noteToInsert = { author: {} };

		noteToInsert['id'] = noteId;
		noteToInsert['ap_id'] = `${config.url}notes/${noteId}`;

		noteToInsert['local'] = true;

		noteToInsert['author'] = authRes.grabbedUserAuth.user;

		noteToInsert['cw'] = sanitize(JSON.parse(req.body).cw);
		noteToInsert['content'] = sanitize(JSON.parse(req.body).content);

		noteToInsert['created_at'] = new Date(Date.now()).toISOString();

		if (JSON.parse(req.body).visibility === 'public') {
			noteToInsert['visibility'] = 'public';
		} else if (JSON.parse(req.body).visibility === 'unlisted') {
			noteToInsert['visibility'] = 'unlisted';
		} else if (JSON.parse(req.body).visibility === 'followers') {
			noteToInsert['visibility'] = 'followers';
		} else if (JSON.parse(req.body).visibility === 'direct') {
			noteToInsert['visibility'] = 'direct';
		} else {
			noteToInsert['visibility'] = 'public';
		}

		await db.getRepository('note').insert(noteToInsert);

		let grabbedUser = await db
			.getRepository('user')
			.findOne({ where: { id: authRes.grabbedUserAuth.user } });

		if (grabbedUser) {
			await OCreate(
				authRes.grabbedUserAuth.user,
				new ApNote(noteToInsert, grabbedUser)
			);
		}

		return res.status(200).json({
			message: 'Note created',
			note: noteToInsert
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;