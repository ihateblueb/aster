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

	const grabbedLocalUserCount = await db
		.getRepository('user')
		.createQueryBuilder()
		.select('user')
		.where({ local: true })
		.getCount();

	const grabbedTotalUserCount = await db
		.getRepository('user')
		.createQueryBuilder()
		.select('user')
		.getCount();

	const grabbedLocalNoteCount = await db
		.getRepository('note')
		.createQueryBuilder()
		.select('note')
		.where({ local: true })
		.getCount();

	const grabbedTotalNoteCount = await db
		.getRepository('note')
		.createQueryBuilder()
		.select('note')
		.getCount();

	const grabbedInstanceCount = await db
		.getRepository('instance')
		.createQueryBuilder()
		.select('instance')
		.getCount();

	res.status(200).json(
		new ApiMeta(
			grabbedMeta,
			grabbedLocalUserCount,
			grabbedTotalUserCount,
			grabbedLocalNoteCount,
			grabbedTotalNoteCount,
			grabbedInstanceCount
		)
	);
});

export default router;
