const router = require('express').Router();
const crypto = require('crypto');

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

		if (grabbedUser) {
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

			if (grabbedUser.followerapproval) {
				userJson['manuallyApprovesFollowers'] = true;
			} else {
				userJson['manuallyApprovesFollowers'] = false;
			}

			if (grabbedUser.discoverable) {
				userJson['discoverable'] = true;
			} else {
				userJson['discoverable'] = false;
			}

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

router.post('/users/:userid/inbox', async (req, res) => {
	if (!req.params.userid) {
		return res.status(400).send('Bad request');
	} else {
		var grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUser[0];

		var host = req.headers.host;
		var date = req.headers.date;
		var digest = req.headers.digest;
		var signature = req.headers.signature;

		console.log(host);
		console.log(date);
		console.log(digest);
		console.log(signature);

		// needs more validation!
		// see: https://github.com/misskey-dev/misskey/blob/develop/packages/backend/src/server/ActivityPubServerService.ts
		if (
			!host ||
			host !==
				config.url
					.replace('https://', '')
					.replace('http://', '')
					.replace('/', '')
		) {
			console.log(
				'[ap] uh-oh! a request was sent that mismatches with the current host'
			);
		} else {
			if (grabbedUser) {
				if (!grabbedUser.followerapproval) {
					// send!
					var followApprovalResponse = {
						'@context': 'https://www.w3.org/ns/activitystreams'
					};
				} else {
					// wait.
				}
			} else {
				return res.status(404).send('Not found');
			}
		}
	}
});

module.exports = router;
