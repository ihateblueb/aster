import express from 'express';

import validateRequest from '../../utils/ap/validation.js';
import inboxQueue from '../../utils/inboxQueue.js';
import logger from '../../utils/logger.js';

const router = express.Router();

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	logger.debug('inbox', JSON.stringify(JSON.parse(req.body)));

	// this will return before the following can run if it's invalid
	let validation = await validateRequest(req);

	if (validation.status === 200 || validation.status === 202) {
		if (validation.status === 202) {
			await inboxQueue.add('inbox', {
				body: JSON.parse(req.body)
			});
		}

		res.status(200).send();
	} else {
		res.status(validation.status).send();
	}
});

export default router;
