const router = require('express').Router();

router.get('/nodeinfo/2.0', (req, res) => {
    if (req.query.resource) {
        res.json({
            "version": "2.0",
            "software": {
                "name": "shit-ap",
                "version": "shit-ap"
            },
            "protocols": [
                "activitypub"
            ],
            "services": {
                "outbound": [],
                "inbound": [],
            },
            "usage": {
                "users": {
                    "total": 1,
                    "activeMonth": 1,
                    "activeHalfyear": 1
                },
                "localposts": 1
            },
            "openRegistrations": false,
            "metadata": {
                "nodeName": "Shit AP Test Instance"
            }
        })
    } else {
        res.send()
    }
})

module.exports = router;