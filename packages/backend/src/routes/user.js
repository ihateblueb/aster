const router = require('express').Router();

const config = require('../util/config.js');
const db = require('../util/database.ts');

router.get('/users/:userid', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).send('Bad request');
	} else {
		var grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUser[0];

		if (grabbedUser && grabbedUser.local) {
			res.setHeader('Content-Type', 'application/activity+json');

			var userJson = {
				'@context': [
					'https://www.w3.org/ns/activitystreams',
					'https://w3id.org/security/v1'
				]
			};

			userJson['id'] = config.url + 'users/' + grabbedUser.id;
			userJson['type'] = 'Person';
			userJson['preferredUsername'] = grabbedUser.username;

			if (grabbedUser.displayname) {
				userJson['name'] = grabbedUser.displayname;
			}

			if (grabbedUser.bio) {
				userJson['summary'] = grabbedUser.bio;
			}

			if (grabbedUser.avatar) {
				userJson['icon'] = {};
				userJson.icon['type'] = 'Image';
				userJson.icon['mediaType'] = 'image';
				userJson.icon['url'] = grabbedUser.avatar;
			}

			if (grabbedUser.banner) {
				userJson['image'] = {};
				userJson.image['type'] = 'Image';
				userJson.image['mediaType'] = 'image';
				userJson.image['url'] = grabbedUser.banner;
			}

			if (grabbedUser.locked) {
				userJson['manuallyApprovesFollowers'] = true;
			} else {
				userJson['manuallyApprovesFollowers'] = false;
			}

			if (grabbedUser.discoverable) {
				userJson['discoverable'] = true;
			} else {
				userJson['discoverable'] = false;
			}

			userJson['published'] = grabbedUser.createdat;

			userJson['inbox'] =
				config.url + 'users/' + grabbedUser.id + '/inbox';

			userJson['publicKey'] = {};
			userJson.publicKey['id'] =
				config.url + 'users/' + grabbedUser.id + '#main-key';
			userJson.publicKey['owner'] =
				config.url + 'users/' + grabbedUser.id;
			userJson.publicKey['publicKeyPem'] = grabbedUser.publickey;

			res.json(userJson);
		} else {
			return res.status(404).send('Not found');
		}
	}
});

module.exports = router;
