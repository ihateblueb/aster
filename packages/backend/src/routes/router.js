const router = require('express').Router();

router.use('/', require('./well-known.js'));
router.use('/', require('./nodeinfo.js'));
router.use('/', require('./user.js'));
router.use('/', require('./note.js'));

module.exports = router;
