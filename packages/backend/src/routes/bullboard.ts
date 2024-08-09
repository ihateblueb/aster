import express from 'express';

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';

import inboxQueue from '../utils/inboxQueue.js';
import deliverQueue from '../utils/deliverQueue.js';
import verifyToken from '../utils/auth/verifyToken.js';
import db from '../utils/database.js';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queue/dashboard');

const router = express.Router();

createBullBoard({
	queues: [new BullMQAdapter(inboxQueue), new BullMQAdapter(deliverQueue)],
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
				{ text: 'Back to Aster', url: '/admin' },
				{ text: 'Logout', url: '/logout' }
			],
			favIcon: {
				default: '/favicon.ico',
				alternative: '/favicon.ico'
			}
		}
	}
});

router.get('/admin/queue/dashboard*', async (req, res, next) => {
	var authRes = await verifyToken(req, true);

	if (authRes.status === 200) {
		var grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: authRes.grabbedUserAuth.user
			}
		});

		if (grabbedUser.admin) {
			next();
		} else {
			return res.status(401).json({
				message: 'User is not an admin'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

router.use('/admin/queue/dashboard', serverAdapter.getRouter());

export default router;
