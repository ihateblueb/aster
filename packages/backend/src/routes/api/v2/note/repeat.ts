import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';
import config from '../../../../utils/config.js';
import OAnnounce from '../../../../outgoing/announce.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/repeat`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			logger('debug', 'note', 'note repeat requested');

			const repeatId = uuidv4();

			let repeatToInsert = {};

			repeatToInsert['id'] = repeatId;
			repeatToInsert['ap_id'] = `${config.url}repeats/${repeatId}`;
			repeatToInsert['created_at'] = new Date(Date.now()).toISOString();
			repeatToInsert['visibility'] = 'public';
			repeatToInsert['author'] = authRes.grabbedUserAuth.user;
			repeatToInsert['local'] = true;
			repeatToInsert['note'] = req.params.noteid;

			console.log(repeatToInsert);

			await db.getRepository('repeat').insert(repeatToInsert);

			OAnnounce(authRes.grabbedUserAuth.user, repeatToInsert);

			return res.status(200).json({
				message: 'Repeated note'
			});
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
