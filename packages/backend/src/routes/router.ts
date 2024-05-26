import express from 'express';

const router = express.Router();

import ap_wellknown from './ap/well-known.js';
import ap_nodeinfo from './ap/nodeinfo.js';
import ap_inbox from './ap/inbox.js';
import ap_user from './ap/user.js';
import ap_note from './ap/note.js';

import api_v1_instance from './api/v1/instance.js';
import api_v1_users from './api/v1/user.js';
import api_v1_notes from './api/v1/note.js';
import api_v1_lookup from './api/v1/lookup.js';

import api_v1_login from './api/v1/login.js';

// required endpoints for federation
router.use('/', ap_wellknown);
router.use('/', ap_nodeinfo);
router.use('/', ap_inbox);
router.use('/', ap_user);
router.use('/', ap_note);

// api
router.use('/', api_v1_instance);
router.use('/', api_v1_users);
router.use('/', api_v1_notes);
router.use('/', api_v1_lookup);

router.use('/', api_v1_login);

export default router;
