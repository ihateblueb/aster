import express from 'express';

import db from '../../../utils/database.js';

const router = express.Router();

// get ad by id or random
router.get('/api/v1/ad/:adId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.adId) {
		return res.status(400).json({
			message: 'Ad ID parameter required'
		});
	} else if (req.params.adId === 'random') {
		var grabbedRandomAd = await db
			.getRepository('ads')
			.query(`SELECT * FROM ads ORDER BY random() LIMIT 1`);
		return res.status(200).json(grabbedRandomAd[0]);
	} else {
		var grabbedAd = await db.getRepository('ads').findOne({
			where: {
				id: req.params.adId
			}
		});

		if (grabbedAd) {
			var adJson = {};

			adJson['id'] = grabbedAd.id;
			adJson['created_at'] = grabbedAd.created_at;
			adJson['expire_at'] = grabbedAd.expire_at;
			adJson['url'] = grabbedAd.url;
			adJson['alt'] = grabbedAd.alt;
			adJson['link'] = grabbedAd.link;
			adJson['comment'] = grabbedAd.comment;

			res.status(200).json(adJson);
		} else {
			return res.status(404).json({
				message: 'Ad does not exist'
			});
		}
	}
});

export default router;