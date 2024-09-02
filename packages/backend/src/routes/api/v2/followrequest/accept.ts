import express from 'express';

import signAndAccept from '../../../../utils/ap/accept.js';
import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import notification from '../../../../utils/notification.js';

const router = express.Router();

router.post('/api/v2/followrequest/accept', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		if (JSON.parse(req.body).id) {
			let grabbedFollowrequest = await db
				.getRepository('relationship')
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

				await db.getRepository('relationship').update(
					{
						id: JSON.parse(req.body).id
					},
					{
						pending: false
					}
				);

				signAndAccept(
					grabbedToUser.id,
					grabbedFromUser.inbox,
					grabbedFollowrequest.object
				);

				await notification.delete({
					object: grabbedFollowrequest.id
				});

				await notification.create(
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

export default router;