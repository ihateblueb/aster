import express from 'express';

import db from '../../../utils/database.js';

const router = express.Router();

// lookup by id
router.get('/api/v1/user/:userid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	} else {
		var grabbedUser = await db.getRepository('users').findOne({
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
				var userJson = {};

				userJson['id'] = grabbedUser.id;
				userJson['username'] = grabbedUser.username;
				userJson['host'] = grabbedUser.host;
				userJson['local'] = grabbedUser.local;
				userJson['url'] = grabbedUser.url;
				userJson['displayname'] = grabbedUser.displayname;
				userJson['locked'] = grabbedUser.locked;
				userJson['suspended'] = grabbedUser.suspended;
				userJson['deactivated'] = grabbedUser.deactivated;
				userJson['discoverable'] = grabbedUser.discoverable;
				userJson['automated'] = grabbedUser.automated;
				userJson['avatar'] = grabbedUser.avatar;
				userJson['banner'] = grabbedUser.banner;
				userJson['background'] = grabbedUser.background;
				userJson['bio'] = grabbedUser.bio;
				userJson['is_cat'] = grabbedUser.is_cat;
				userJson['speak_as_cat'] = grabbedUser.speak_as_cat;
				userJson['created_at'] = grabbedUser.created_at;
				userJson['updated_at'] = grabbedUser.updated_at;

				res.status(200).json(userJson);
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

export default router;
