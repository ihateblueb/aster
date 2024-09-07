import express from 'express';
import UserAuthService from '../../../../services/UserAuthService.js';

const router = express.Router();

router.patch(`/api/v2/note`, async (req, res) => {
	let authRes = await UserAuthService.verifyToken(req);

	if (authRes.status === 200) {
		return res.status(501).json({
			message: 'Not implemented'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
});

export default router;
