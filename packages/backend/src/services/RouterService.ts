import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import * as feHandler from 'frontend/build/handler.js';
import swaggerUi from 'swagger-ui-express';

import ap_context from '../routes/ap/context.js';
import ap_followers from '../routes/ap/followers.js';
import ap_following from '../routes/ap/following.js';
import ap_inbox from '../routes/ap/inbox.js';
import ap_like from '../routes/ap/like.js';
import nodeinfo from '../routes/ap/nodeinfo.js';
import ap_note_activity from '../routes/ap/note/activity.js';
import ap_note_get from '../routes/ap/note/get.js';
import ap_user_get from '../routes/ap/user/get.js';
import ap_user_outbox from '../routes/ap/user/outbox.js';
import wellknown from '../routes/ap/wellknown.js';
import admin_federation_rules_edit from '../routes/api/admin/federation/rules/edit.js';
import admin_federation_rules_get from '../routes/api/admin/federation/rules/get.js';
import admin_report_get from '../routes/api/admin/report/get.js';
import admin_reports_get from '../routes/api/admin/reports/get.js';
import auth_login from '../routes/api/auth/login.js';
import auth_register from '../routes/api/auth/register.js';
import auth_revoke from '../routes/api/auth/revoke.js';
import drive_file_delete from '../routes/api/drive/file/delete.js';
import drive_file_edit from '../routes/api/drive/file/edit.js';
import drive_file_get from '../routes/api/drive/file/get.js';
import drive_timeline from '../routes/api/drive/timeline.js';
import meta_edit from '../routes/api/meta/edit.js';
import meta_get from '../routes/api/meta/get.js';
import note_create from '../routes/api/note/create.js';
import note_delete from '../routes/api/note/delete.js';
import note_get from '../routes/api/note/get.js';
import note_like from '../routes/api/note/like.js';
import note_repeat from '../routes/api/note/repeat.js';
import notification_read from '../routes/api/notifications/read.js';
import notification_timeline from '../routes/api/notifications/timeline.js';
import timeline_bubble from '../routes/api/timeline/bubble.js';
import timeline_home from '../routes/api/timeline/home.js';
import timeline_local from '../routes/api/timeline/local.js';
import timeline_public from '../routes/api/timeline/public.js';
import user_bite from '../routes/api/user/bite.js';
import user_block from '../routes/api/user/block.js';
import user_edit from '../routes/api/user/edit.js';
import user_follow from '../routes/api/user/folllow.js';
import user_get from '../routes/api/user/get.js';
import user_lookup from '../routes/api/user/lookup.js';
import user_refetch from '../routes/api/user/refetch.js';
import user_relationship from '../routes/api/user/relationship.js';
import misc_manifest from '../routes/misc/manifest.js';
import misc_metrics from '../routes/misc/metrics.js';
import misc_ping from '../routes/misc/ping.js';
import misc_upload from '../routes/misc/upload.js';
import misc_uploads from '../routes/misc/uploads.js';
import oapi from '../utils/apidoc.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import AuthService from './AuthService.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
import MetricsService from './MetricsService.js';
import QueueService from './QueueService.js';

const router = express.Router();

router.use(cookieParser());
router.use(cors());

router.use((req, res, next) => {
	const id = IdService.generate();
	res.setHeader('As-Request-Id', id);
	res.setHeader('TDM-Reservation', '1');

	// uploads have 1 day cache
	if (req.path.startsWith('/uploads'))
		res.setHeader('Cache-Control', 'public, max-age=86400');

	if (
		req.headers['user-agent'] &&
		req.headers['user-agent'].match(
			new RegExp(ConfigService.security.blockedUserAgents.join('|'), 'i')
		)
	) {
		logger.info(
			'security',
			'blocked request from useragent ' + req.headers['user-agent']
		);

		return res.status(401).send();
	}

	const end = MetricsService.requestResponseTime.startTimer();

	if (
		req.path &&
		!req.path.startsWith('/_app') &&
		!req.path.startsWith('/api/queues') &&
		!req.path.startsWith('/queue/api') &&
		!req.path.startsWith('/queue/static') &&
		!req.path.startsWith('/metrics')
	)
		logger.http(
			'<--',
			`${req.method.toLowerCase()} ${req.path} ${logger.formatHttpId(id)}`
		);

	res.on('finish', () => {
		if (
			req.path &&
			!req.path.startsWith('/_app') &&
			!req.path.startsWith('/api/queues') &&
			!req.path.startsWith('/queue/api') &&
			!req.path.startsWith('/queue/static') &&
			!req.path.startsWith('/metrics')
		)
			logger.http(
				'-->',
				`${req.method.toLowerCase()} ${req.path} ${logger.formatStatus(res.statusCode)} ${logger.formatHttpId(id)}`
			);

		end();
	});

	next();
});

// bull board

if (ConfigService.router.queue) {
	const serverAdapter = new ExpressAdapter();
	serverAdapter.setBasePath('/queue');

	createBullBoard({
		queues: [
			new BullMQAdapter(QueueService.inbox),
			new BullMQAdapter(QueueService.deliver),
			new BullMQAdapter(QueueService.backfill)
		],
		serverAdapter,
		options: {
			uiConfig: {
				boardTitle: 'Queue Dashboard',
				boardLogo: {
					path: '/favicon.ico',
					width: 0,
					height: 0
				},
				miscLinks: [
					{ text: 'Back to Aster', url: '/' },
					{ text: 'Logout', url: '/logout' }
				],
				favIcon: {
					default: '/favicon.ico',
					alternative: '/favicon.ico'
				}
			}
		}
	});

	router.get('/queue*', async (req, res, next) => {
		const auth = await AuthService.verify(req.cookies.as_token);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		if (!auth.user.admin)
			return res.status(403).json({
				message: locale.auth.insufficientPermissions
			});

		next();
	});

	router.use('/queue', serverAdapter.getRouter());
}

// regular routes

if (ConfigService.router.oapi) router.use(oapi);
if (ConfigService.router.swagger) {
	let options = {
		swaggerOptions: {
			url: '/openapi.json',
			persistAuthorization: true
		}
	};

	router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(null, options));
}

// api

router.use('/', admin_federation_rules_get);
router.use('/', admin_federation_rules_edit);
router.use('/', admin_report_get);
router.use('/', admin_reports_get);

router.use('/', auth_login);
router.use('/', auth_register);
router.use('/', auth_revoke);

router.use('/', drive_timeline);
router.use('/', drive_file_delete);
router.use('/', drive_file_edit);
router.use('/', drive_file_get);

router.use('/', meta_edit);
router.use('/', meta_get);

router.use('/', note_create);
router.use('/', note_delete);
router.use('/', note_get);
router.use('/', note_like);
router.use('/', note_repeat);

router.use('/', notification_read);
router.use('/', notification_timeline);

router.use('/', timeline_bubble);
router.use('/', timeline_home);
router.use('/', timeline_local);
router.use('/', timeline_public);

router.use('/', user_bite);
router.use('/', user_block);
router.use('/', user_edit);
router.use('/', user_follow);
router.use('/', user_get);
router.use('/', user_lookup);
router.use('/', user_refetch);
router.use('/', user_relationship);

router.use('/', misc_manifest);
if (ConfigService.metrics.enabled) router.use('/', misc_metrics);
router.use('/', misc_ping);
router.use('/', misc_upload);
router.use('/', misc_uploads);

// ap
router.use('/', ap_context);
router.use('/', ap_followers);
router.use('/', ap_following);
router.use('/', ap_inbox);
router.use('/', ap_like);
router.use('/', nodeinfo);
router.use('/', ap_note_activity);
router.use('/', ap_note_get);
router.use('/', ap_user_get);
router.use('/', ap_user_outbox);
router.use('/', wellknown);

// packages/frontend
if (ConfigService.router.frontend) {
	router.get('/admin*', async (req, res, next) => {
		const auth = await AuthService.verify(req.cookies.as_token);

		if (auth.error)
			return res.status(auth.status).json({
				message: auth.message
			});

		if (!auth.user.admin)
			return res.status(403).json({
				message: locale.auth.insufficientPermissions
			});

		next();
	});

	router.use(feHandler.handler);
}

export default router;
