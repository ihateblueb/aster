const router = require('express').Router()

const config = require('../util/config.js')

// nodeinfo
router.get('/.well-known/nodeinfo', (req, res) => {
	if (req.query.resource) {
		res.setHeader('Content-Type', 'application/activity+json')
		res.json({
			links: [
				{
					rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
					href: `${config.url}nodeinfo/2.0`
				}
			]
		})
	} else {
		res.send()
	}
})

// webfinger
router.get('/.well-known/webfinger', (req, res) => {
	if (req.query.resource) {
		res.setHeader('Content-Type', 'application/activity+json')

		if (req.query.resource.startsWith('acct:')) {
			res.json({
				subject: 'acct:blueb@as1.blueb.me',
				links: [
					{
						rel: 'self',
						type: 'application/activity+json',
						href: `${config.url}users/1`
					}
				]
			})
		} else {
			res.send()
		}
	} else {
		res.send()
	}
})

module.exports = router
