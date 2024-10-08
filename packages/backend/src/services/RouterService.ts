import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import oapi from '../utils/apidoc.js';

import auth_register from '../routes/api/auth/register.js';

import misc_ping from '../routes/misc/ping.js';
import misc_uploads from '../routes/misc/uploads.js';

import * as feHandler from 'frontend/build/handler.js';

const router = express.Router();

router.use(bodyParser.raw({ type: '*/*' }));
router.use(cookieParser());
router.use(cors());

router.use((req, res, next) => {
	res.setHeader('TDM-Reservation', '1');

	// media has 1 day cache
	if (req.path.startsWith('/uploads')) {
		res.setHeader('Cache-Control', 'public, max-age=86400');
	}

	/*
	if (
		req.headers['user-agent'].match(
			new RegExp(config.get().security.blockedUserAgents.join('|'), 'i')
		)
	) {
		logger.info(
			'security',
			'blocked request from useragent ' + req.headers['user-agent']
		);

		res.status(403).end();

		next(403);
	}
	*/

	next();
});

router.use(oapi);
router.use('/swagger', oapi.swaggerui())

router.use('/', auth_register);

router.use('/', misc_ping);
router.use('/', misc_uploads);

router.use(feHandler.handler);

export default router;
