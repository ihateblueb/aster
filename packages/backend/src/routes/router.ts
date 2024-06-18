import ap_inbox from './ap/inbox.js';
import ap_nodeinfo from './ap/nodeinfo.js';
import ap_note from './ap/note.js';
import ap_user from './ap/user.js';
import ap_wellknown from './ap/well-known.js';
import api_v1_ads from './api/v1/ads.js';
import api_v1_followrequests from './api/v1/followrequest.js';
import api_v1_login from './api/v1/login.js';
import api_v1_lookup from './api/v1/lookup.js';
import api_v1_meta from './api/v1/meta.js';
import api_v1_metrics_hardware from './api/v1/metrics/hardware.js';
import api_v1_metrics_queue from './api/v1/metrics/queue.js';
import api_v1_notes from './api/v1/note.js';
import api_v1_notification from './api/v1/notification.js';
import api_v1_users from './api/v1/user.js';
import api_v1_search from './api/v1/search.js';
import express from 'express';

const router = express.Router();

// required endpoints for federation
router.use('/', ap_wellknown);
router.use('/', ap_nodeinfo);
router.use('/', ap_inbox);
router.use('/', ap_user);
router.use('/', ap_note);

// api
router.use('/', api_v1_meta);
router.use('/', api_v1_users);
router.use('/', api_v1_notes);
router.use('/', api_v1_lookup);
router.use('/', api_v1_login);
router.use('/', api_v1_ads);
router.use('/', api_v1_notification);
router.use('/', api_v1_followrequests);
router.use('/', api_v1_search);

// metrics
router.use('/', api_v1_metrics_queue);
router.use('/', api_v1_metrics_hardware);

export default router;
