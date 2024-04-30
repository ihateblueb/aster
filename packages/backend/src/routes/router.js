const express = require('express');
const router = require('express').Router();

router.use('/', express.static('../../frontend/.output/public'));
router.use('/', require('./misc.js'));

router.use('/', require('./ap/well-known.js'));
router.use('/', require('./ap/nodeinfo.js'));
router.use('/', require('./ap/inbox.js'));
router.use('/', require('./ap/user.js'));
router.use('/', require('./ap/note.js'));

router.use('/', require('./api/v1/accounts.js'));

module.exports = router;
