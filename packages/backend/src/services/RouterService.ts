import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import * as feHandler from 'frontend/build/handler.js';

import ap_inbox from '../routes/ap/inbox.js';
import nodeinfo from '../routes/ap/nodeinfo.js';
import ap_note from '../routes/ap/note.js';
import ap_user from '../routes/ap/user.js';
import wellknown from '../routes/ap/wellknown.js';
import auth_login from '../routes/api/auth/login.js';
import auth_register from '../routes/api/auth/register.js';
import auth_revoke from '../routes/api/auth/revoke.js';
import meta_get from '../routes/api/meta/get.js';
import note_create from '../routes/api/note/create.js';
import note_delete from '../routes/api/note/delete.js';
import note_get from '../routes/api/note/get.js';
import notification_read from '../routes/api/notifications/read.js';
import notification_timeline from '../routes/api/notifications/timeline.js';
import timeline_bubble from '../routes/api/timeline/bubble.js';
import timeline_home from '../routes/api/timeline/home.js';
import timeline_local from '../routes/api/timeline/local.js';
import timeline_public from '../routes/api/timeline/public.js';
import user_edit from '../routes/api/user/edit.js';
import user_get from '../routes/api/user/get.js';
import user_lookup from '../routes/api/user/lookup.js';
import misc_ping from '../routes/misc/ping.js';
import misc_uploads from '../routes/misc/uploads.js';
import oapi from '../utils/apidoc.js';
import config from '../utils/config.js';
import locale from '../utils/locale.js';
import logger from '../utils/logger.js';
import AuthService from './AuthService.js';
import QueueService from './QueueService.js';
import UserService from './UserService.js';

const router = express.Router();

router.use(bodyParser.raw({ type: '*/*' }));
router.use(cookieParser());
router.use(cors());

router.use((req, res, next) => {
	res.setHeader('TDM-Reservation', '1');

	// uploads have 1 day cache
	if (req.path.startsWith('/uploads')) {
		res.setHeader('Cache-Control', 'public, max-age=86400');
	}

	if (
		req.headers['user-agent'].match(
			new RegExp(config.security.blockedUserAgents.join('|'), 'i')
		)
	) {
		logger.info(
			'security',
			'blocked request from useragent ' + req.headers['user-agent']
		);

		res.status(401).end();

		next(401);
	}

	logger.debug(
		req.method ? req.method.toLowerCase() : 'http',
		req.path
			? req.path
			: '/' +
					(req.headers.accept
						? ' (accept: ' + req.headers.accept + ')'
						: '')
	);

	console.log(req.cookies);

	next();
});

// bull board

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queue');

createBullBoard({
	queues: [
		new BullMQAdapter(QueueService.inbox),
		new BullMQAdapter(QueueService.deliver)
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
	let auth = await AuthService.verify(req.cookies.as_token);

	if (auth.error)
		return res.status(auth.status).json({
			message: auth.message
		});

	if (!(await UserService.get({ id: auth.user })).admin)
		return res.status(403).json({
			message: locale.auth.insufficientPermissions
		});

	next();
});

router.use('/queue', serverAdapter.getRouter());

// regular routes

router.use(oapi);
router.use('/swagger', oapi.swaggerui());

// api
router.use('/', auth_login);
router.use('/', auth_register);
router.use('/', auth_revoke);

router.use('/', meta_get);

router.use('/', note_create);
router.use('/', note_delete);
router.use('/', note_get);

router.use('/', notification_read);
router.use('/', notification_timeline);

router.use('/', timeline_bubble);
router.use('/', timeline_home);
router.use('/', timeline_local);
router.use('/', timeline_public);

router.use('/', user_edit);
router.use('/', user_get);
router.use('/', user_lookup);

router.use('/', misc_ping);
router.use('/', misc_uploads);

// ap
router.use('/', ap_inbox);
router.use('/', nodeinfo);
router.use('/', ap_note);
router.use('/', ap_user);
router.use('/', wellknown);

router.use(feHandler.handler);

export default router;
