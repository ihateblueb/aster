const router = require('express').Router();

router.get('/notes/:noteid', (req, res) => {
    if (!req.params.noteid) {
        return res.status(400).send('Bad request');
    } else if (req.params.noteid === "1") {
        res.json({
            
        })
    }
})

module.exports = router;
