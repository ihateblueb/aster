const router = require('express').Router();

import pkg from '../../../../package.json';

router.get('/nodeinfo/2.0', (req, res) => {
    if (req.query.resource) {
        res.json(JSON.parse(`{
            "version": "2.0",
            "software": {
                "name": "${pkg.name}",
                "version": "${pkg.version}"
            },
            "protocols": [
                "activitypub"
            ],
            "services": {
                "outbound": [],
                "inbound": [],
            },
            "openRegistrations": false,
            "metadata": {
                "nodeName": "Shit AP Test Instance"
            }
        }`))
    } else {
        res.send()
    }
})

module.exports = router;