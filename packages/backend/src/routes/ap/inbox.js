const router = require('express').Router();

const validateRequest = require('../../utils/ap/validation.js');

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/activity+json',
		'application/ld+json'
	]);

	console.log(req.headers);
	console.log(JSON.parse(req.body));

	validateRequest(req, res);

	// if it has passed the 40 validation checks, you can now trust it!
});

module.exports = router;
