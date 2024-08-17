import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import Logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';

const router = express.Router();

router.post(`/api/v2/user/:userid/bite`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.userid) {
		if (authRes.status === 200) {
			Logger.debug('user', 'user bite requested');
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
			message: 'User ID parameter required'
		});
	}
});

export default router;
