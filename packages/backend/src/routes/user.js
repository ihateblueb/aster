const router = require('express').Router();
const httpSignature = require('@peertube/http-signature');
const crypto = require('crypto');

const config = require('../util/config.js');
const db = require('../util/database.ts');

const getRemoteActor = require('../util/getRemoteActor.js');

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

			if (grabbedUser.banner) {
				userJson['image'] = {};
				userJson.image['type'] = 'Image';
				userJson.image['mediaType'] = 'image';
				userJson.image['url'] = grabbedUser.banner;
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

router.post('/users/:userid/inbox', async (req, res) => {
	var grabbedUser = await db.getRepository('users').find({
		where: {
			id: Number(req.params.userid)
		}
	});

	var grabbedUser = grabbedUser[0];

	if (!req.params.userid) {
		return res.status(400).send('bad request');
	} else if (grabbedUser.suspended) {
		return res.status(410).send('user suspended');
	} else if (grabbedUser.deactivated) {
		return res.status(410).send('user deactivated');
	} else {
		var host = req.headers.host;
		var date = req.headers.date;
		var digest = req.headers.digest;

		var httpSig = httpSignature.parseRequest(req);

		// needs more validation!
		// see: https://github.com/misskey-dev/misskey/blob/develop/packages/backend/src/server/ActivityPubServerService.ts

		// split digest at =
		var digest = digest.split(/=(.*)/s);
		console.log(digest);

		// checks if the host is the same as the instance url, or if it even exists on the request
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
			return res
				.status(401)
				.send('host did not match instance configuration');
		}
		// checks if there is a digest
		else if (!digest[1]) {
			console.log(
				'[ap] what? a request was sent that does not have a digest'
			);
			return res.status(401).send('digest missing');
		}
		// checks if the digest is the right algorithim
		else if (!digest[0] === 'SHA-256') {
			console.log(
				'[ap] uh-oh! a request was sent with an invalid digest'
			);
			return res.status(401).send('digest invalid');
		}
		// checks if the digest matches what it says it is
		else {
			console.log(httpSig);

			var remoteActorId = httpSig.keyId.split('#')[0];
			console.log('[ap] received request from id ' + remoteActorId);

			var remoteActorKey = (await getRemoteActor(remoteActorId))
				.publicKey;

			// add blocking code here later

			return res.status(200).send();
		}

		/*

			This will be executed after it is sent to a Redis-like software

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

		*/
	}
});

module.exports = router;
