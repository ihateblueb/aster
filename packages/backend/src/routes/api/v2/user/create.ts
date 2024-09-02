import express from 'express';

const router = express.Router();

router.post(`/api/v2/user`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

export default router;
