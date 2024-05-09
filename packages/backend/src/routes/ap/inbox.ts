import express from 'express';
const router = express.Router();

import validateRequest from '../../utils/ap/validation';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest';

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	console.log(JSON.parse(req.body));

	validateRequest(req, res);

	// if it has passed the 40 validation checks, you can now trust it!

	acceptInboxRequest(JSON.parse(req.body), res);
});

export default router;
