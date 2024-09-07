import express from 'express';
import admin from '../../../../../admin.js';
import logger from '../../../../../../utils/logger.js';

const router = express.Router();

router.post(`/api/v2/admin/instances/blocked`, admin, async (req, res) => {
	logger.debug('admin', 'blocked host ' + req.body.host);

	res.status(501).json({
		message: 'Not implemented'
	});
});

export default router;
