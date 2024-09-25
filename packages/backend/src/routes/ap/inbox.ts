import express from 'express';

import logger from '../../utils/logger.js';

import ApValidationService from '../../services/ap/ApValidationService.js';
import ApInboxService from '../../services/ap/ApInboxService.js';

const router = express.Router();

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	logger.debug('inbox', JSON.stringify(JSON.parse(req.body)));

	if (await ApValidationService.isValidRequest(req)) {
		let inboxResponse = await ApInboxService.process(JSON.parse(req.body));

		res.status(inboxResponse.status).json({
			message: inboxResponse.message
		});
	} else {
		res.status(401).send();
	}
});

export default router;
