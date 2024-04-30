const router = require('express').Router();
const httpSignature = require('@peertube/http-signature');
const crypto = require('crypto');

const config = require('../utils/config.js');
const db = require('../utils/database.ts');

const getRemoteActor = require('../utils/getRemoteActor.js');

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/json',
		'application/activity+json',
		'application/ld+json'
	]);

	var grabbedUser = await db.getRepository('users').find({
		where: {
			id: Number(req.params.userid)
		}
	});

	var grabbedUser = grabbedUser[0];

	if (!req.params.userid) {
		return res.status(400).send('bad request');
	} else if (!grabbedUser.local) {
		return res.status(404).send('not found');
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
			var remoteActorId = httpSig.keyId.split('#')[0];
			console.log('[ap] received request from id ' + remoteActorId);

			console.log(await getRemoteActor(remoteActorId));

			// add blocking code here later

			console.log(req.body);

			return res.status(200).send();
		}

		/*

			This will be executed after it is sent to a Redis-like software

			if (grabbedUser) {
				if (!grabbedUser.locked) {
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
