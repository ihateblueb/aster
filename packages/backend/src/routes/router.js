const express = require('express');
const router = require('express').Router();

router.use('/', express.static('../../frontend/.output/public'));
router.use('/', require('./misc.js'));

router.use('/', require('./well-known.js'));
router.use('/', require('./nodeinfo.js'));
router.use('/', require('./user.js'));
router.use('/', require('./note.js'));

router.use('/', require('./api/v1/accounts.js'));

module.exports = router;
