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
			if (req.body.displayname) {
				updatedUser['displayname'] = sanitize(req.body.displayname);
			}
			if (req.body.locked) {
				updatedUser['locked'] = sanitize(req.body.locked);
			}
			if (req.body.discoverable) {
				updatedUser['discoverable'] = sanitize(req.body.discoverable);
			}
			if (req.body.indexable) {
				updatedUser['indexable'] = sanitize(req.body.indexable);
			}
			if (req.body.automated) {
				updatedUser['automated'] = sanitize(req.body.automated);
			}
			if (req.body.avatar) {
				updatedUser['avatar'] = sanitize(req.body.avatar);
			}
			if (req.body.avatar_alt) {
				updatedUser['avatar_alt'] = sanitize(req.body.avatar_alt);
			}
			if (req.body.banner) {
				updatedUser['banner'] = sanitize(req.body.banner);
			}
			if (req.body.banner_alt) {
				updatedUser['banner_alt'] = sanitize(req.body.banner_alt);
			}
			if (req.body.background) {
				updatedUser['background'] = sanitize(req.body.background);
			}
			if (req.body.background_alt) {
				updatedUser['background_alt'] = sanitize(
					req.body.background_alt
				);
			}
			if (req.body.bio) {
				updatedUser['bio'] = sanitize(req.body.bio);
			}
			if (req.body.location) {
				updatedUser['location'] = sanitize(req.body.location);
			}
			if (req.body.birthday) {
				updatedUser['birthday'] = sanitize(req.body.birthday);
			}
			if (req.body.is_cat) {
				updatedUser['is_cat'] = sanitize(req.body.is_cat);
			}
			if (req.body.speak_as_cat) {
				updatedUser['speak_as_cat'] = sanitize(req.body.speak_as_cat);
			}
			if (req.body.pinned_notes) {
				updatedUser['pinned_notes'] = sanitize(req.body.pinned_notes);
			}
			if (req.body.metadata) {
				updatedUser['metadata'] = sanitize(req.body.metadata);
			}

			await db
				.getRepository('user')
				.update({ id: authRes.grabbedUserAuth }, updatedUser);

			let grabbedUpdateduser = await db.getRepository('user').findOne({
				where: {
					id: authRes.grabbedUserAuth
				}
			});

			return res.status(200).json({
				message: 'Updated user',
				user: grabbedUpdateduser
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
