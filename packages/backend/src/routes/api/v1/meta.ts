import express from 'express';

import db from '../../../utils/database.js';

const router = express.Router();

router.get('/api/v1/meta', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const grabbedMeta = await db.getRepository('meta').find();

	res.status(200).json(grabbedMeta[0]);
});

export default router;
