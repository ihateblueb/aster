import express from 'express';
const router = express.Router();

import db from '../../../utils/database.js';

router.get('/api/v1/users/:userid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'userid parameter required'
		});
	} else {
		var grabbedUserDb = await db.getRepository('users').find({
			where: {
				id: req.params.userid
			}
		});

		var grabbedUser = grabbedUserDb[0];

		if (grabbedUser) {
			if (grabbedUser.suspended) {
				return res.status(410).json({
					message: 'user suspended'
				});
			} else if (grabbedUser.deactivated) {
				return res.status(410).json({
					message: 'user deactivated'
				});
			} else {
				var userJson = {};

				userJson['id'] = grabbedUser.id;
				userJson['username'] = grabbedUser.username;
				userJson['local'] = grabbedUser.local;
				userJson['url'] = grabbedUser.url;
				userJson['displayname'] = grabbedUser.displayname;
				userJson['locked'] = grabbedUser.locked;
				userJson['suspended'] = grabbedUser.suspended;
				userJson['deactivated'] = grabbedUser.deactivated;
				userJson['discoverable'] = grabbedUser.discoverable;
				userJson['automated'] = grabbedUser.automated;
				userJson['avatar'] = grabbedUser.avatar;
				userJson['header'] = grabbedUser.banner;
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
				message: 'user doesnt exist'
			});
		}
	}
});

export default router;
