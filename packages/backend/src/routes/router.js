import express from 'express';
import router from 'express';

// eventually will point towards static generated frontend
router.use('/', express.static('../../frontend/.output/public'));
router.use('/', './misc.js');

// required endpoints for federation
router.use('/', './ap/well-known.js');
router.use('/', './ap/nodeinfo.js');
router.use('/', './ap/inbox.js');
router.use('/', './ap/user.js');
router.use('/', './ap/note.js');

// api
router.use('/', './api/v1/instance.js');
router.use('/', './api/v1/accounts.js');
router.use('/', './api/v1/notes.js');
