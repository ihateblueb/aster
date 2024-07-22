import express from 'express';

const router = express.Router();

// ap
router.use('/', await import('./ap/well-known.js'));
router.use('/', await import('./ap/nodeinfo.js'));
router.use('/', await import('./ap/inbox.js'));
router.use('/', await import('./ap/user.js'));
router.use('/', await import('./ap/note.js'));

// api
router.use('/', await import('./api/v2/meta.js'));
router.use('/', await import('./api/v2/user/bite.js'));
router.use('/', await import('./api/v2/user/create.js'));
router.use('/', await import('./api/v2/user/delete.js'));
router.use('/', await import('./api/v2/user/edit.js'));
router.use('/', await import('./api/v2/user/follow.js'));
router.use('/', await import('./api/v2/user/get.js'));
router.use('/', await import('./api/v2/user/lookup.js'));
router.use('/', await import('./api/v2/user/report.js'));
router.use('/', await import('./api/v2/note/bookmark.js'));
router.use('/', await import('./api/v2/note/create.js'));
router.use('/', await import('./api/v2/note/delete.js'));
router.use('/', await import('./api/v2/note/edit.js'));
router.use('/', await import('./api/v2/note/get.js'));
router.use('/', await import('./api/v2/note/like.js'));
router.use('/', await import('./api/v2/note/pin.js'));
router.use('/', await import('./api/v2/note/quote.js'));
router.use('/', await import('./api/v2/note/react.js'));
router.use('/', await import('./api/v2/note/repeat.js'));
router.use('/', await import('./api/v2/note/report.js'));
router.use('/', await import('./api/v2/login.js'));
router.use('/', await import('./api/v2/ad.js'));
router.use('/', await import('./api/v2/notification.js'));
router.use('/', await import('./api/v2/followrequest.js'));
router.use('/', await import('./api/v2/search.js'));
router.use('/', await import('./api/v2/timeline.js'));
router.use('/', await import('./api/v2/instance.js'));
router.use('/', await import('./api/v2/metrics/hardware.js'));
router.use('/', await import('./api/v2/metrics/queue.js'));

export default router;
