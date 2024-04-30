const router = require('express').Router();

const config = require('../../../util/config.js');
const db = require('../../../util/database.ts');

router.get('/api/v1/accounts/:userid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'userid paramater required'
		});
	} else {
		var grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUser[0];

		if (grabbedUser.suspended) {
			return res.status(410).json({
				message: 'user suspended'
			});
		} else if (grabbedUser.suspended) {
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

			res.json(userJson);
		}
	}
});

module.exports = router;
