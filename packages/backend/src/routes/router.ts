import express from 'express';

const router = express.Router();

import ap_wellknown from './ap/well-known';
import ap_nodeinfo from './ap/nodeinfo';
import ap_inbox from './ap/inbox';
import ap_user from './ap/user';
import ap_note from './ap/note';

import api_v1_instance from './api/v1/instance';
import api_v1_accounts from './api/v1/accounts';
import api_v1_notes from './api/v1/notes';

// required endpoints for federation
router.use('/', ap_wellknown);
router.use('/', ap_nodeinfo);
router.use('/', ap_inbox);
router.use('/', ap_user);
router.use('/', ap_note);

// api
router.use('/', api_v1_instance);
router.use('/', api_v1_accounts);
router.use('/', api_v1_notes);

export default router;
