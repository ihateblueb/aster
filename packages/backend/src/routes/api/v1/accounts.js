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
			userJson['acct'] = grabbedUser.username;
			userJson['display_name'] = grabbedUser.displayname;
			userJson['locked'] = grabbedUser.locked;
			userJson['bot'] = grabbedUser.automated;
			userJson['created_at'] = grabbedUser.createdat;
			userJson['note'] = grabbedUser.bio;
			userJson['url'] = config.url + 'users/' + grabbedUser.id;
			// add static for both later as well
			userJson['avatar'] = grabbedUser.avatar;
			userJson['header'] = grabbedUser.banner;

			res.json(userJson);
		}
	}
});

module.exports = router;
