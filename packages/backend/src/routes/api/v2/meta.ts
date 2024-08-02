import express from 'express';

import db from '../../../utils/database.js';
import ApiMeta from '../../../constructors/meta.js';
import generateMeta from '../../../generators/meta.js';

const router = express.Router();

router.get('/api/v2/meta', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const grabbedMeta = await db
		.getRepository('meta')
		.createQueryBuilder()
		.getOne();

	let generatedMeta = await generateMeta(grabbedMeta);

	res.status(generatedMeta.status).json(
		generatedMeta.meta
			? generatedMeta.meta
			: {
					message: generatedMeta.message
				}
	);
});

export default router;
