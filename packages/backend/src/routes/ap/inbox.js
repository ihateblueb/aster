const router = require('express').Router();

const validateRequest = require('../../utils/ap/validation.js');
const acceptInboxRequest = require('../../utils/ap/acceptInboxRequest.js');

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

module.exports = router;
