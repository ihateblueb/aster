const router = require('express').Router();

// const config = require('../../utils/config.js');
// const db = require('../../utils/database.ts');

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/json',
		'application/activity+json',
		'application/ld+json'
	]);

	// for now, return 400 until i rewrite this shitshow
	return res.status(400).send();
});

module.exports = router;
