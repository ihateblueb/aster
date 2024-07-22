import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';

const router = express.Router();

router.patch(`/api/v2/note`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		return res.status(501).json({
			message: 'Not implemented'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
