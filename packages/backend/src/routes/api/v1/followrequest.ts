import express from 'express';

import db from '../../../utils/database.js';
import verifyToken from '../../../utils/auth/verifyToken.js';

const router = express.Router();

router.get('/api/v1/followrequests', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		var grabbedFollowrequests = await db
			.getRepository('users_followrequest')
			.find({
				where: {
					to: authRes.grabbedUserAuth.user
				}
			});
		return res.status(200).json(grabbedFollowrequests);
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

router.post('/api/v1/followrequest/accept', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		await db.getRepository('users_followrequest').find({
			where: {
				to: authRes.grabbedUserAuth.user
			}
		});
		return res.status(200).json({
			message: 'Accepted follow request'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

router.post('/api/v1/followrequest/deny', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		await db.getRepository('users_followrequest').find({
			where: {
				to: authRes.grabbedUserAuth.user
			}
		});
		return res.status(200).json({
			message: 'Denied follow request'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
