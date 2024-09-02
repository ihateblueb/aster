import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import RelationshipService from '../../../../services/RelationshipService.js';

const router = express.Router();

router.post(`/api/v2/user/:userid/follow`, async (req, res) => {
	let authRes = await verifyToken(req);

	if (req.params.userid) {
		if (authRes.status === 200) {
			let grabbedUser = await db.getRepository('user').findOne({
				where: {
					id: req.params.userid
				}
			});

			if (grabbedUser) {
				let relationshipResponse = await RelationshipService.create(
					grabbedUser.id,
					authRes.grabbedUserAuth.user
				);

				res.status(relationshipResponse.status).json({
					message: relationshipResponse.message
				});
			} else {
				res.status(404).json({
					message: 'User not found'
				});
			}
		} else {
			res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		res.status(400).json({
			message: 'User ID parameter required'
		});
	}
});

export default router;
