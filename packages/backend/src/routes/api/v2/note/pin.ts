import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import Logger from '../../../../utils/logger.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/pin`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			Logger.debug('note', 'note pin requested');

			await db
				.getRepository('user')
				.query(
					`UPDATE "user" SET "pinned_notes" = array_append("pinned_notes", '${req.params.noteid}') WHERE "id" = '${authRes.grabbedUserAuth.user}'`
				);

			return res.status(200).json({
				message: 'Pinned note'
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

router.post(`/api/v2/note/:noteid/unpin`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			Logger.debug('note', 'note pin requested');

			await db
				.getRepository('user')
				.query(
					`UPDATE "user" SET "pinned_notes" = array_remove("pinned_notes", '${req.params.noteid}') WHERE "id" = '${authRes.grabbedUserAuth.user}'`
				);

			return res.status(200).json({
				message: 'Pinned note'
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
