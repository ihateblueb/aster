const axios = require('axios');

const config = require('../util/config.js');
const db = require('../util/database.ts');

async function getRemoteActor(remoteActorUrl) {
	console.log('[ap] attempting to grab remote actor ' + remoteActorUrl);

	var grabbedUser = await db.getRepository('users').find({
		where: {
			apid: remoteActorUrl
		}
	});

	var grabbedUser = grabbedUser[0];

	if (grabbedUser) {
		console.log('[ap] actor ' + remoteActorUrl + ' exists in database');
	} else {
		console.log(
			'[ap] actor ' + remoteActorUrl + ' does not exist in database'
		);
		axios
			.get(remoteActorUrl, {
				headers: { Accept: 'application/activity+json' }
			})
			.then((res) => {
				console.log(res);
				processNewActor(res.data);
			})
			.catch((e) => {
				console.error(e);
				return;
			});
	}
}

async function processNewActor(res) {
	if ((res.type = 'Person' && res.name && res.id && res.publicKey)) {
		var userToInsert = {};

		userToInsert['id'];

		userToInsert['username'] = res.preferredUsername;
		userToInsert['apid'] = res.id;

		userToInsert['local'] = false;

		if (res.name) {
			userToInsert['displayname'] = res.name;
		}

		if (res._misskey_summary) {
			userToInsert['bio'] = res._misskey_summary;
		} else if (res.summary) {
			userToInsert['bio'] = res.summary;
		}

		if (res.icon) {
			userToInsert['avatar'] = res.icon.url;
		}

		if (res.image) {
			userToInsert['banner'] = res.image.url;
		}

		if (res.backgroundUrl) {
			userToInsert['background'] = res.backgroundUrl;
		}

		if (res.manuallyApprovesFollowers) {
			userToInsert['followerapproval'] = res.manuallyApprovesFollowers;
		}

		if (res.suspended) {
			userToInsert['suspended'] = res.suspended;
		}

		if (res.discoverable) {
			userToInsert['discoverable'] = res.discoverable;
		}

		if (res.automated) {
			userToInsert['automated'] = res.automated;
		}

		if (res.isCat) {
			userToInsert['iscat'] = res.isCat;
		}

		if (res.speakAsCat) {
			userToInsert['speakascat'] = res.speakAsCat;
		}

		if (res.createdat) {
			userToInsert['createdat'] = Date.now().toString();
		}

		userToInsert['publicKey'] = res.publicKey.publicKeyPem.join();

		var newActor = await db.getRepository('users').insert(userToInsert);

		var newActor = newActor[0];

		console.log(newActor);
	}
}

module.exports = getRemoteActor;
