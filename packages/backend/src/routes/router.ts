import express from 'express';

import uploads from './uploads.js';
import assets from './assets.js';

import bullboard from './bullboard.js';

import ap_wellknown from './ap/well-known.js';
import ap_nodeinfo from './ap/nodeinfo.js';
import ap_inbox from './ap/inbox.js';
import ap_user from './ap/user.js';
import ap_note from './ap/note.js';

import api_admin_sonic_index from './api/v2/admin/search/sonic.js';

import api_admin_instances_get from './api/v2/admin/instances/get.js';

import api_admin_instances_blocked_get from './api/v2/admin/instances/blocked/get.js';
import api_admin_instances_blocked_add from './api/v2/admin/instances/blocked/add.js';
import api_admin_instances_blocked_remove from './api/v2/admin/instances/blocked/remove.js';

import api_admin_instances_forcedVisibility_get from './api/v2/admin/instances/forcedVisibility/get.js';
import api_admin_instances_forcedVisibility_add from './api/v2/admin/instances/forcedVisibility/add.js';
import api_admin_instances_forcedVisibility_remove from './api/v2/admin/instances/forcedVisibility/remove.js';

import api_admin_instances_silenced_get from './api/v2/admin/instances/silenced/get.js';
import api_admin_instances_silenced_add from './api/v2/admin/instances/silenced/add.js';
import api_admin_instances_silenced_remove from './api/v2/admin/instances/silenced/remove.js';

import api_user_bite from './api/v2/user/bite.js';
import api_user_create from './api/v2/user/create.js';
import api_user_delete from './api/v2/user/delete.js';
import api_user_edit from './api/v2/user/edit.js';
import api_user_follow from './api/v2/user/follow.js';
import api_user_get from './api/v2/user/get.js';
import api_user_lookup from './api/v2/user/lookup.js';
import api_user_raw from './api/v2/user/raw.js';
import api_user_report from './api/v2/user/report.js';
import api_user_timeline from './api/v2/user/timeline.js';
import api_user_update from './api/v2/user/update.js';

import api_note_bookmark from './api/v2/note/bookmark.js';
import api_note_create from './api/v2/note/create.js';
import api_note_delete from './api/v2/note/delete.js';
import api_note_edit from './api/v2/note/edit.js';
import api_note_get from './api/v2/note/get.js';
import api_note_like from './api/v2/note/like.js';
import api_note_pin from './api/v2/note/pin.js';
import api_note_quote from './api/v2/note/quote.js';
import api_note_raw from './api/v2/note/raw.js';
import api_note_react from './api/v2/note/react.js';
import api_note_repeat from './api/v2/note/repeat.js';
import api_note_report from './api/v2/note/report.js';

import api_drive_get from './api/v2/drive/get.js';

import api_drive_file_add from './api/v2/drive/file/add.js';
import api_drive_file_edit from './api/v2/drive/file/edit.js';
import api_drive_file_delete from './api/v2/drive/file/delete.js';
import api_drive_file_get from './api/v2/drive/file/get.js';

import api_meta_get from './api/v2/meta/get.js';
import api_meta_edit from './api/v2/meta/edit.js';

import api_ad from './api/v2/ad.js';

import api_followrequests_get from './api/v2/followrequest/get.js';
import api_followrequest_accept from './api/v2/followrequest/accept.js';
import api_followrequest_deny from './api/v2/followrequest/deny.js';

import api_instance from './api/v2/instance.js';
import api_login from './api/v2/login.js';
import api_notifications from './api/v2/notifications.js';
import api_search from './api/v2/search.js';
import api_timeline from './api/v2/timeline.js';

import api_metrics_hardware from './api/v2/metrics/hardware.js';
import api_metrics_queue from './api/v2/metrics/queue.js';
import config from '../utils/config.js';

const router = express.Router();

router.use('/', uploads);
router.use('/', assets);

if (config.get().frontend.bullboard) {
	router.use('/', bullboard);
}

// ap
router.use('/', ap_wellknown);
router.use('/', ap_nodeinfo);
router.use('/', ap_inbox);
router.use('/', ap_user);
router.use('/', ap_note);

// api
router.use('/', api_admin_sonic_index);

router.use('/', api_admin_instances_get);

router.use('/', api_admin_instances_blocked_get);
router.use('/', api_admin_instances_blocked_add);
router.use('/', api_admin_instances_blocked_remove);

router.use('/', api_admin_instances_forcedVisibility_get);
router.use('/', api_admin_instances_forcedVisibility_add);
router.use('/', api_admin_instances_forcedVisibility_remove);

router.use('/', api_admin_instances_silenced_get);
router.use('/', api_admin_instances_silenced_add);
router.use('/', api_admin_instances_silenced_remove);

router.use('/', api_user_bite);
router.use('/', api_user_create);
router.use('/', api_user_delete);
router.use('/', api_user_edit);
router.use('/', api_user_follow);
router.use('/', api_user_get);
router.use('/', api_user_lookup);
router.use('/', api_user_raw);
router.use('/', api_user_report);
router.use('/', api_user_timeline);
router.use('/', api_user_update);

router.use('/', api_note_bookmark);
router.use('/', api_note_create);
router.use('/', api_note_delete);
router.use('/', api_note_edit);
router.use('/', api_note_get);
router.use('/', api_note_like);
router.use('/', api_note_pin);
router.use('/', api_note_quote);
router.use('/', api_note_raw);
router.use('/', api_note_react);
router.use('/', api_note_repeat);
router.use('/', api_note_report);

router.use('/', api_drive_get);

router.use('/', api_drive_file_add);
router.use('/', api_drive_file_edit);
router.use('/', api_drive_file_delete);
router.use('/', api_drive_file_get);

router.use('/', api_meta_get);
router.use('/', api_meta_edit);

router.use('/', api_ad);

router.use('/', api_followrequests_get);
router.use('/', api_followrequest_accept);
router.use('/', api_followrequest_deny);

router.use('/', api_instance);
router.use('/', api_login);
router.use('/', api_notifications);
router.use('/', api_search);
router.use('/', api_timeline);

router.use('/', api_metrics_hardware);
router.use('/', api_metrics_queue);

export default router;
