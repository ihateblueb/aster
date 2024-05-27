import express from 'express';

import config from '../../utils/config.js';
import db from '../../utils/database.js';

const router = express.Router();

router.get('/users/:userid', async (req, res, next) => {
	if (!req.params.userid) {
		return res.status(400).json({ message: 'User ID parameter required' });
	} else {
		if (!req.accepts('html')) {
			var grabbedUser = await db.getRepository('users').findOne({
				where: {
					id: req.params.userid
				}
			});

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
				return res.status(404).json({ message: 'Not found' });
			}
		} else {
			var grabbedUser = await db.getRepository('users').findOne({
				where: {
					id: req.params.userid
				}
			});

			if (!grabbedUser.local) {
				res.redirect(`/@${grabbedUser.username}@${grabbedUser.host}`);
			} else {
				res.redirect(`/@${grabbedUser.username}`);
			}
		}
	}
});

export default router;
