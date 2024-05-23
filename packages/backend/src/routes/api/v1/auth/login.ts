import express from 'express';
import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';

const router = express.Router();

router.post('/api/v1/login', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.body) {
		return res.status(400).json({
			message: 'body required'
		});
	} else {
		/*
			body should look like this:
			{
				"Ymx1ZWI6ZmFrZXB3aW1ub3RzdHVwaWQ="
			}
			content is username and pw encoded in base64 separated by a colon
		*/
		logger('debug', 'auth', req.body);
		console.log(atob(req.body));
	}
});

export default router;
