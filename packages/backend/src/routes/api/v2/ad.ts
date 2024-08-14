import express from 'express';

import db from '../../../utils/database.js';

const router = express.Router();

// get ad by id or random
router.get('/api/v2/ad/:adId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.adId) {
		return res.status(400).json({
			message: 'Ad ID parameter required'
		});
	} else if (req.params.adId === 'random') {
		let grabbedRandomAd = await db
			.getRepository('ad')
			.createQueryBuilder()
			.orderBy('RANDOM()')
			.getOne();
		return res.status(200).json(grabbedRandomAd);
	} else {
		let grabbedAd = await db.getRepository('ads').findOne({
			where: {
				id: req.params.adId
			}
		});

		if (grabbedAd) {
			res.status(200).json(grabbedAd);
		} else {
			return res.status(404).json({
				message: 'Ad does not exist'
			});
		}
	}
});

export default router;
