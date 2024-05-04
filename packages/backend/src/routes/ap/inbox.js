const router = require('express').Router();

// const config = require('../../utils/config.js');
// const db = require('../../utils/database.ts');

const validateRequest = require('../../utils/ap/validation.js');

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/json',
		'application/activity+json',
		'application/ld+json'
	]);

	console.log(req.headers);
	console.log(req.body);

	validateRequest(req, res);
});

module.exports = router;
