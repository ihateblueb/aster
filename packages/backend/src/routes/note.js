const router = require('express').Router();

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

router.get('/notes/:noteid', (req, res) => {
    if (!req.params.noteid) {
        return res.status(400).send('Bad request');
    } else if (req.params.noteid === "1") {
        res.json({
            "id": `${config.url}notes/1`,
            "type": "Note",
            "published": "2024-04-27T02:43:42Z",
            "attributedTo": `${config.url}users/blueb`,
            "content": "<p>first aster post :3c</p>",
            "_misskey_content": "first aster note $[tada :3c]",
            "to": [
                "https://www.w3.org/ns/activitystreams#Public"
            ],
        })
    }
})

module.exports = router;
