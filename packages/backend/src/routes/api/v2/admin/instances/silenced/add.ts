import express from 'express';
import admin from '../../../../../admin.js';

const router = express.Router();

router.post(`/api/v2/admin/instances/silenced`, admin, async (req, res) => {
	res.status(501).json({
		message: 'Not implemented'
	});
});

export default router;
