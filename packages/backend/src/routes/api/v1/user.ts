import express from 'express';

import verifyToken from '../../../utils/auth/verifyToken.js';
import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import sanitize from '../../../utils/sanitize.js';

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
	var authRes = await verifyToken(req.headers.authorization);

	if (authRes.status === 200) {
		let updatedUser = [];

		if (req.body) {
			if (JSON.parse(req.body).displayname) {
				updatedUser['displayname'] = sanitize(
					JSON.parse(req.body).displayname
				);
			}
			if (JSON.parse(req.body).locked) {
				updatedUser['locked'] = sanitize(JSON.parse(req.body).locked);
			}
			if (JSON.parse(req.body).discoverable) {
				updatedUser['discoverable'] = sanitize(
					JSON.parse(req.body).discoverable
				);
			}
			if (JSON.parse(req.body).indexable) {
				updatedUser['indexable'] = sanitize(
					JSON.parse(req.body).indexable
				);
			}
			if (JSON.parse(req.body).automated) {
				updatedUser['automated'] = sanitize(
					JSON.parse(req.body).automated
				);
			}
			if (JSON.parse(req.body).avatar) {
				updatedUser['avatar'] = sanitize(JSON.parse(req.body).avatar);
			}
			if (JSON.parse(req.body).avatar_alt) {
				updatedUser['avatar_alt'] = sanitize(
					JSON.parse(req.body).avatar_alt
				);
			}
			if (JSON.parse(req.body).banner) {
				updatedUser['banner'] = sanitize(JSON.parse(req.body).banner);
			}
			if (JSON.parse(req.body).banner_alt) {
				updatedUser['banner_alt'] = sanitize(
					JSON.parse(req.body).banner_alt
				);
			}
			if (JSON.parse(req.body).background) {
				updatedUser['background'] = sanitize(
					JSON.parse(req.body).background
				);
			}
			if (JSON.parse(req.body).background_alt) {
				updatedUser['background_alt'] = sanitize(
					JSON.parse(req.body).background_alt
				);
			}
			if (JSON.parse(req.body).bio) {
				updatedUser['bio'] = sanitize(JSON.parse(req.body).bio);
			}
			if (JSON.parse(req.body).location) {
				updatedUser['location'] = sanitize(
					JSON.parse(req.body).location
				);
			}
			if (JSON.parse(req.body).birthday) {
				updatedUser['birthday'] = sanitize(
					JSON.parse(req.body).birthday
				);
			}
			if (JSON.parse(req.body).is_cat) {
				updatedUser['is_cat'] = sanitize(JSON.parse(req.body).is_cat);
			}
			if (JSON.parse(req.body).speak_as_cat) {
				updatedUser['speak_as_cat'] = sanitize(
					JSON.parse(req.body).speak_as_cat
				);
			}
			if (JSON.parse(req.body).pinned_notes) {
				updatedUser['pinned_notes'] = sanitize(
					JSON.parse(req.body).pinned_notes
				);
			}
			if (JSON.parse(req.body).metadata) {
				updatedUser['metadata'] = sanitize(
					JSON.parse(req.body).metadata
				);
			}

			await db
				.getRepository('user')
				.update({ id: authRes.grabbedUserAuth.user }, updatedUser);

			let grabbedUpdatedUser = await db.getRepository('user').findOne({
				where: {
					id: authRes.grabbedUserAuth.user
				}
			});

			return res.status(200).json({
				message: 'Updated user',
				user: grabbedUpdatedUser
			});
		}
		return res.status(400).json({
			message: 'Body required'
		});
	} else {
		return res.status(authRes.status).json({
			message: authRes.message
		});
	}
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
