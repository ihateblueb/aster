const router = require('express').Router();

// nodeinfo
router.get('/.well-known/nodeinfo', (req, res) => {
    if (req.query.resource) {
        res.json({
            "links": [
                {
                    "rel": "http://nodeinfo.diaspora.software/ns/schema/2.0",
                    "href": "https://shit1.blueb.me/nodeinfo/2.0"
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
        res.json({
            "subject": "acct:blueb@shit1.blueb.me",
            "links": [
                {
                    "rel": "self",
                    "type": "application/activity+json",
                    "href": "https://shit1.blueb.me/users/blueb"
                }
            ]
        })
    } else {
        res.send()
    }
})

module.exports = router;