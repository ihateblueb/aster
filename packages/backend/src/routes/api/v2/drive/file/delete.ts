import express from 'express';
import UserAuthService from '../../../../../services/UserAuthService.js';

const router = express.Router();

router.delete(`/api/v2/drive/file/:id`, async (req, res) => {
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
