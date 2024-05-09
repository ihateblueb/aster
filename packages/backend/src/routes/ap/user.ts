import express from 'express';
const router = express.Router();

import config from '../../utils/config';
import db from '../../utils/database';

router.get('/users/:userid', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).json({ message: 'bad request' });
	} else {
		var grabbedUserDb = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUserDb[0];

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
				userJson['icon'] = {
					type: 'Image',
					url: grabbedUser.avatar
				};
			}

			if (grabbedUser.banner) {
				userJson['image'] = {
					type: 'Image',
					url: grabbedUser.banner
				};
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

			if (grabbedUser.deactivated) {
				userJson['deactivated'] = true;
			} else {
				userJson['deactivated'] = false;
			}

			if (grabbedUser.suspended) {
				userJson['suspended'] = true;
			} else {
				userJson['suspended'] = false;
			}

			userJson['published'] = grabbedUser.created_at;

			userJson['inbox'] =
				config.url + 'users/' + grabbedUser.id + '/inbox';

			userJson['endpoints'] = {
				sharedInbox: `${config.url}inbox`
			};

			userJson['publicKey'] = {
				id: `${config.url}users/${grabbedUser.id}#main-key`,
				owner: `${config.url}users/${grabbedUser.id}`,
				publicKeyPem: `${grabbedUser.public_key}`
			};

			res.json(userJson);
		} else {
			return res.status(404).json({ message: 'not found' });
		}
	}
});

export default router;
