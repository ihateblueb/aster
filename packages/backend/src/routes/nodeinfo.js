const router = require('express').Router();

const pkg = require('../../../../package.json');

const config = require('../util/config.js');

router.get('/nodeinfo/2.0', (req, res) => {
	res.setHeader('Content-Type', 'application/activity+json');
	res.json({
		version: '2.0',
		software: {
			name: `${pkg.name}`,
			version: `${pkg.version}`
		},
		protocols: ['activitypub'],
		services: {
			outbound: [],
			inbound: []
		},
		openRegistrations: false,
		metadata: {
			nodeName: `${config.nodename}`
		}
	});
});

module.exports = router;
