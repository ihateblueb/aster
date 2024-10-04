import express from 'express';

const router = express.Router();

router.get('/ping', (res, req) => {
	req.status(200).json({
		serverTime: new Date(Date.now()).toISOString()
	});
});

export default router;
