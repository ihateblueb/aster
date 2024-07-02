import express from 'express';

import db from '../../../utils/database.js';
import ApiMeta from '../../../constructors/meta.js';

const router = express.Router();

router.get('/api/v1/meta', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const grabbedMeta = await db
		.getRepository('meta')
		.createQueryBuilder()
		.getRawOne();

	res.status(200).json(new ApiMeta(grabbedMeta));
});

export default router;
