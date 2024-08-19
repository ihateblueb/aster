import express from 'express';

import config from '../../../../../utils/config.js';
import db from '../../../../../utils/database.js';
import ingest from '../../../../../utils/sonic/ingest.js';
import Logger from '../../../../../utils/logger.js';

const router = express.Router();

router.post(`/api/v2/admin/emoji`, async (req, res) => {
	Logger.debug('admin', 'emoji created');

	res.status(200).json({
		message: 'Flushed all content'
	});
});

export default router;