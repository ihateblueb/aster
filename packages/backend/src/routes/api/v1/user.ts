import express from 'express';

import verifyToken from '../../../utils/auth/verifyToken.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

// lookup by id
router.get('/api/v1/user/:userid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	} else {
		var grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: req.params.userid
			}
		});

		if (grabbedUser) {
			if (grabbedUser.suspended) {
				return res.status(410).json({
					message: 'User suspended'
				});
			} else if (grabbedUser.deactivated) {
				return res.status(410).json({
					message: 'User deactivated'
				});
			} else {
				res.status(200).json(grabbedUser);
			}
		} else {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
	}
});

// create user
router.post(`/api/v1/user`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

// edit user
router.patch(`/api/v1/user`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

// delete user
router.delete(`/api/v1/user`, async (req, res) => {
	return res.status(501).json({
		message: 'Not implemented'
	});
});

/*
	User Interactions
*/

// follow user
router.post(`/api/v1/user/:userid/follow`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.userid) {
		if (authRes.status === 200) {
			logger('debug', 'user', 'user follow requested');
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

// report user
router.post(`/api/v1/user/:userid/report`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.userid) {
		if (authRes.status === 200) {
			logger('debug', 'user', 'user report requested');
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

// bite user
router.post(`/api/v1/user/:userid/bite`, async (req, res) => {
	var authRes = await verifyToken(req.headers.authorization);

	if (req.params.userid) {
		if (authRes.status === 200) {
			logger('debug', 'user', 'user bite requested');
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
