import express from 'express';

import logger from '../../../../../utils/logger.js';
import admin from '../../../../admin.js';

const router = express.Router();

router.post(`/api/v2/admin/emoji`, admin, async (req, res) => {
	logger.debug('admin', 'emoji created');

	res.status(200).json({
		message: 'Flushed all content'
	});
});

export default router;
