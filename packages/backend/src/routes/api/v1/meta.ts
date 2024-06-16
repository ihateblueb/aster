import express from 'express';

import db from '../../../utils/database.js';

import buildMeta from '../../../builders/meta.js';

const router = express.Router();

router.get('/api/v1/meta', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const metaDb = await db.getRepository('meta').find();
	const grabbedMeta = metaDb[0];

	var metaJson = await buildMeta(grabbedMeta);

	res.status(200).json(metaJson);
});

export default router;
