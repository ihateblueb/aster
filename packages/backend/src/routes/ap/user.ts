import express from 'express';

import config from '../../utils/config.js';
import db from '../../utils/database.js';
import ApActor from '../../constructors/ApActor.js';

const router = express.Router();

router.get('/users/:userid', async (req, res, next) => {
	if (!req.params.userid) {
		return res.status(400).json({ message: 'User ID parameter required' });
	} else {
		if (!req.accepts('html')) {
			var grabbedUser = await db
				.getRepository('user')
				.createQueryBuilder()
				.select('user')
				.where({ id: req.params.userid })
				.getRawOne();

			if (grabbedUser && grabbedUser.local) {
				res.setHeader('Content-Type', 'application/activity+json');
				res.json(new ApActor(grabbedUser));
			} else {
				return res.status(404).json({ message: 'Not found' });
			}
		} else {
			var grabbedUser = await db
				.getRepository('user')
				.createQueryBuilder()
				.select('user')
				.where({ id: req.params.userid })
				.getRawOne();

			if (!grabbedUser.local) {
				res.redirect(`/@${grabbedUser.username}@${grabbedUser.host}`);
			} else {
				res.redirect(`/@${grabbedUser.username}`);
			}
		}
	}
});

export default router;
