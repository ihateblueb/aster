import express from 'express';

import signAndAccept from '../../../utils/ap/accept.js';
import signAndReject from '../../../utils/ap/reject.js';
import verifyToken from '../../../utils/auth/verifyToken.js';
import createNotification from '../../../utils/createNotification.js';
import db from '../../../utils/database.js';

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
		if (JSON.parse(req.body).id) {
			var grabbedFollowrequest = await db
				.getRepository('users_followrequest')
				.findOne({
					where: {
						id: JSON.parse(req.body).id
					}
				});

			if (grabbedFollowrequest) {
				var grabbedToUser = await db.getRepository('users').findOne({
					where: {
						id: grabbedFollowrequest.to
					}
				});

				var grabbedFromUser = await db.getRepository('users').findOne({
					where: {
						id: grabbedFollowrequest.from
					}
				});

				await db.getRepository('users_followrequest').delete({
					id: JSON.parse(req.body).id
				});

				console.log([
					'deny',
					grabbedToUser.id,
					grabbedFromUser.inbox,
					JSON.parse(grabbedFollowrequest.object)
				]);

				signAndAccept(
					grabbedToUser.id,
					grabbedFromUser.inbox,
					JSON.parse(grabbedFollowrequest.object)
				);

				await db
					.getRepository('users')
					.query(
						`UPDATE "users" SET "followers" = array_append("followers", '${grabbedFromUser.ap_id}') WHERE "id" = '${grabbedToUser.id}'`
					);

				createNotification(
					grabbedToUser.id,
					grabbedFromUser.id,
					'follow'
				);

				return res.status(200).json({
					message: 'Accepted follow request'
				});
			} else {
				return res.status(400).json({
					message: 'Follow request doesnt exist'
				});
			}
		} else {
			return res.status(400).json({
				message: 'No follow request id'
			});
		}
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
		if (JSON.parse(req.body).id) {
			var grabbedFollowrequest = await db
				.getRepository('users_followrequest')
				.findOne({
					where: {
						id: JSON.parse(req.body).id
					}
				});

			var grabbedToUser = await db.getRepository('users').findOne({
				where: {
					id: grabbedFollowrequest.to
				}
			});

			var grabbedFromUser = await db.getRepository('users').findOne({
				where: {
					id: grabbedFollowrequest.from
				}
			});

			await db.getRepository('users_followrequest').delete({
				id: JSON.parse(req.body).id
			});

			console.log([
				'deny',
				grabbedToUser.id,
				grabbedFromUser.inbox,
				JSON.parse(grabbedFollowrequest.object)
			]);

			signAndReject(
				grabbedToUser.id,
				grabbedFromUser.inbox,
				JSON.parse(grabbedFollowrequest.object)
			);

			return res.status(200).json({
				message: 'Denied follow request'
			});
		} else {
			return res.status(400).json({
				message: 'No follow request id'
			});
		}
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
