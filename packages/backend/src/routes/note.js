const router = require('express').Router();

const config = require('../utils/config.js');

router.get('/notes/:noteid', (req, res) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'bad request' });
	} else if (req.params.noteid === '1') {
		res.setHeader('Content-Type', 'application/activity+json');
		res.json({
			id: `${config.url}notes/1`,
			type: 'Note',
			published: '2024-04-27T02:43:42Z',
			attributedTo: `${config.url}users/blueb`,
			content: '<p>first aster post :3c</p>',
			_misskey_content: 'first aster note $[tada :3c]',
			to: ['https://www.w3.org/ns/activitystreams#Public']
		});
	}
});

module.exports = router;
