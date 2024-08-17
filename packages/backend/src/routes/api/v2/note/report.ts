import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import Logger from '../../../../utils/logger.js';

const router = express.Router();

router.post(`/api/v2/note/:noteid/report`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.noteid) {
		if (authRes.status === 200) {
			Logger.debug('note', 'note report requested');
			return res.status(501).json({
				message: 'Not implemented'
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
