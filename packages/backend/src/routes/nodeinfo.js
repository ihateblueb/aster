const router = require('express').Router();

const pkg = require('../../../../package.json');

const yaml = require('js-yaml');
const fs = require('fs');

try {
    var config = yaml.load(fs.readFileSync('../../config/production.yml', 'utf8'));
    console.log("[config] configuration loaded successfully!");
} catch (e) {
    console.error("[config] "+e);
    console.error("[config] fatal. now aborting.");
    process.exit(1);
}

router.get('/nodeinfo/2.0', (req, res) => {
    res.json({
        "version": "2.0",
        "software": {
            "name": `${pkg.name}`,
            "version": `${pkg.version}`
        },
        "protocols": [
            "activitypub"
        ],
        "services": {
            "outbound": [],
            "inbound": []
        },
        "openRegistrations": false,
        "metadata": {
            "nodeName": `${config.nodename}`
        }
    })
})

module.exports = router;