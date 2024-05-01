const axios = require('axios');

const config = require('../../utils/config.js');
const db = require('../../utils/database.ts');

const updateRemoteActor = require('./updateRemoteActor.js');

async function getRemoteActor(remoteActorUrl) {
	console.log('[ap] attempting to grab remote actor ' + remoteActorUrl);

	var grabbedUser = await db.getRepository('users').find({
		where: {
			ap_id: remoteActorUrl
		}
	});

	var grabbedUser = grabbedUser[0];

	if (grabbedUser) {
		console.log('[ap] actor ' + remoteActorUrl + ' exists in database');
		updateRemoteActor(remoteActorUrl);
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
				processNewActor(remoteActorUrl, res.data);
			})
			.catch((e) => {
				if ((e.response.status = 410)) {
					console.error('[ap] actor ' + remoteActorUrl + ' is gone');
				} else {
					console.error(e);
				}
				return;
			});
	}
}

async function processNewActor(remoteActorUrl, res) {
	if ((res.type = 'Person' && res.preferredUsername && res.id)) {
		var userToInsert = {};

		userToInsert['id'];

		userToInsert['username'] = res.preferredUsername;
		userToInsert['ap_id'] = res.id;
		userToInsert['url'] = res.url;

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
			userToInsert['locked'] = res.manuallyApprovesFollowers;
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
			userToInsert['is_cat'] = res.isCat;
		}

		if (res.speakAsCat) {
			userToInsert['speak_as_cat'] = res.speakAsCat;
		}

		userToInsert['created_at'] = new Date(Date.now()).toISOString();

		userToInsert['updated_at'] = new Date(Date.now()).toISOString();

		if (!res.suspended) {
			userToInsert['public_key'] = res.publicKey.publicKeyPem.toString();
		}

		await db.getRepository('users').insert(userToInsert);

		console.log('[ap] created remote actor ' + remoteActorUrl);

		return await res;
	}
}

module.exports = getRemoteActor;
