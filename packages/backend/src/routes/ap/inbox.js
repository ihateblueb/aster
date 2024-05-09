import router from 'express';

import validateRequest from '../../utils/ap/validation.js';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest.js';

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
