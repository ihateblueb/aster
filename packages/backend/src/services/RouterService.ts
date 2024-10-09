import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import oapi from '../utils/apidoc.js';
import logger from '../utils/logger.js';
import config from '../utils/config.js';

import auth_login from '../routes/api/auth/login.js';
import auth_register from '../routes/api/auth/register.js';
import auth_revoke from '../routes/api/auth/revoke.js';

import meta_get from '../routes/api/meta/get.js';

import note_create from '../routes/api/note/create.js';
import note_get from '../routes/api/note/get.js';

import user_edit from '../routes/api/user/edit.js';
import user_get from '../routes/api/user/get.js';
import user_lookup from '../routes/api/user/lookup.js';

import misc_ping from '../routes/misc/ping.js';
import misc_uploads from '../routes/misc/uploads.js';

import nodeinfo from '../routes/ap/nodeinfo.js';
import ap_user from '../routes/ap/user.js';

import * as feHandler from 'frontend/build/handler.js';

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

	next();
});

router.use(oapi);
router.use('/swagger', oapi.swaggerui());

// api
router.use('/', auth_login);
router.use('/', auth_register);
router.use('/', auth_revoke);

router.use('/', meta_get);

router.use('/', note_create);
router.use('/', note_get);

router.use('/', user_edit);
router.use('/', user_get);
router.use('/', user_lookup);

router.use('/', misc_ping);
router.use('/', misc_uploads);

// ap
router.use('/', nodeinfo);
router.use('/', ap_user);

router.use(feHandler.handler);

export default router;
