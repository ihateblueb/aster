import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import Logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';

const router = express.Router();

router.delete(`/api/v2/user`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

export default router;
