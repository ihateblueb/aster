import ap_inbox from './ap/inbox.js';
import ap_nodeinfo from './ap/nodeinfo.js';
import ap_note from './ap/note.js';
import ap_user from './ap/user.js';
import ap_wellknown from './ap/well-known.js';
import api_v2_ads from './api/v2/ads.js';
import api_v2_followrequests from './api/v2/followrequest.js';
import api_v2_login from './api/v2/login.js';
import api_v2_lookup from './api/v2/lookup.js';
import api_v2_meta from './api/v2/meta.js';
import api_v2_metrics_hardware from './api/v2/metrics/hardware.js';
import api_v2_metrics_queue from './api/v2/metrics/queue.js';
import api_v2_notes from './api/v2/note.js';
import api_v2_notification from './api/v2/notification.js';
import api_v2_users from './api/v2/user.js';
import api_v2_search from './api/v2/search.js';
import api_v2_timeline from './api/v2/timeline.js';
import api_v2_instance from './api/v2/instance.js';

import express from 'express';

const router = express.Router();

// required endpoints for federation
router.use('/', ap_wellknown);
router.use('/', ap_nodeinfo);
router.use('/', ap_inbox);
router.use('/', ap_user);
router.use('/', ap_note);

// api
router.use('/', api_v2_meta);
router.use('/', api_v2_users);
router.use('/', api_v2_notes);
router.use('/', api_v2_lookup);
router.use('/', api_v2_login);
router.use('/', api_v2_ads);
router.use('/', api_v2_notification);
router.use('/', api_v2_followrequests);
router.use('/', api_v2_search);
router.use('/', api_v2_timeline);
router.use('/', api_v2_instance);

// metrics
router.use('/', api_v2_metrics_queue);
router.use('/', api_v2_metrics_hardware);

export default router;
