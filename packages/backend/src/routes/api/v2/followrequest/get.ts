import express from 'express';
import db from '../../../../utils/database.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.get('/api/v2/followrequests', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		let grabbedFollowrequests = await db
			.getRepository('relationship')
			.find({
				where: {
					to: authRes.grabbedUserAuth.user,
					pending: true
				}
			});

		return res.status(200).json(grabbedFollowrequests);
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
