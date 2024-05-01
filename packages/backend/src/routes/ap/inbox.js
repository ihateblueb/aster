const router = require('express').Router();
const httpSignature = require('@peertube/http-signature');
const crypto = require('crypto');

const config = require('../../utils/config.js');
const db = require('../../utils/database.ts');

const validateRequest = require('../../utils/ap/validateRequest.js');
const fetchRemoteActor = require('../../utils/ap/fetchRemoteActor.js');

router.post(['/inbox', '/users/:userid/inbox'], async (req, res) => {
	res.setHeader('Accept', [
		'application/json',
		'application/activity+json',
		'application/ld+json'
	]);

	// everything under it will not run if the signature is bad
	validateRequest(req, res);

	if (req.params.userid) {
		var grabbedUser = await db.getRepository('users').find({
			where: {
				id: Number(req.params.userid)
			}
		});

		var grabbedUser = grabbedUser[0];
	}
	if (!req.params.userid) {
		return res.status(400).json({ message: 'bad request' });
	} else if (!grabbedUser.local) {
		return res.status(404).json({ message: 'not found' });
	} else if (grabbedUser.suspended) {
		return res.status(410).json({ message: 'user suspended' });
	} else if (grabbedUser.deactivated) {
		return res.status(410).json({ message: 'user deactivated' });
	} else {
		var httpSig = httpSignature.parseRequest(req);
		var remoteActorId = httpSig.keyId.split('#')[0];

		console.log('[ap] received request from id ' + remoteActorId);

		console.log(await fetchRemoteActor(remoteActorId));

		return res.status(200).send();
	}
});

module.exports = router;
