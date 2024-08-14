import express from 'express';

import signAndAccept from '../../../utils/ap/accept.js';
import signAndReject from '../../../utils/ap/reject.js';
import verifyToken from '../../../utils/auth/verifyToken.js';
import createNotification from '../../../utils/actions/createNotification.js';
import db from '../../../utils/database.js';

const router = express.Router();

router.get('/api/v2/followrequests', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		let grabbedFollowrequests = await db
			.getRepository('user_followrequest')
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

router.post('/api/v2/followrequest/accept', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let grabbedFollowrequest = await db
				.getRepository('user_followrequest')
				.findOne({
					where: {
						id: JSON.parse(req.body).id
					}
				});

			if (grabbedFollowrequest) {
				let grabbedToUser = await db.getRepository('user').findOne({
					where: {
						id: grabbedFollowrequest.to
					}
				});

				let grabbedFromUser = await db.getRepository('user').findOne({
					where: {
						id: grabbedFollowrequest.from
					}
				});

				await db.getRepository('user_followrequest').delete({
					id: JSON.parse(req.body).id
				});

				signAndAccept(
					grabbedToUser.id,
					grabbedFromUser.inbox,
					JSON.parse(grabbedFollowrequest.object)
				);

				await db
					.getRepository('user')
					.query(
						`UPDATE "user" SET "followers" = array_append("followers", '${grabbedFromUser.ap_id}') WHERE "id" = '${grabbedToUser.id}'`
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

router.post('/api/v2/followrequest/deny', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let grabbedFollowrequest = await db
				.getRepository('user_followrequest')
				.findOne({
					where: {
						id: JSON.parse(req.body).id
					}
				});

			let grabbedToUser = await db.getRepository('user').findOne({
				where: {
					id: grabbedFollowrequest.to
				}
			});

			let grabbedFromUser = await db.getRepository('user').findOne({
				where: {
					id: grabbedFollowrequest.from
				}
			});

			await db.getRepository('user_followrequest').delete({
				id: JSON.parse(req.body).id
			});

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
