import express from 'express';
import logger from '../../../../utils/logger.js';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.post(`/api/v2/user/:userid/bite`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (req.params.userid) {
		if (authRes.status === 200) {
			logger.debug('user', 'user report requested');
			return res.status(501).json({
				message: 'Not implemented'
			});
		} else {
			return res.status(authRes.status).json({
				message: authRes.message
			});
		}
	} else {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	}
});

export default router;
