const axios = require('axios');

const config = require('../util/config.js');
const db = require('../util/database.ts');

async function updateRemoteActor(remoteActorUrl) {
	console.log('[ap] attempting to update remote actor ' + remoteActorUrl);

	axios
		.get(remoteActorUrl, {
			headers: { Accept: 'application/activity+json' }
		})
		.then((res) => {
			console.log(res);
			processActor(res.data);
		})
		.catch((e) => {
			if ((e.response.status = 410)) {
				console.error('[ap] actor ' + remoteActorUrl + ' is gone');
				deleteActor(remoteActorUrl);
			} else {
				console.error(e);
			}
			return;
		});
}

async function processActor(res) {
	if ((res.type = 'Person' && res.preferredUsername && res.id)) {
		var userToUpdate = {};

		userToUpdate['id'];

		userToUpdate['username'] = res.preferredUsername;
		userToUpdate['url'] = res.url;

		userToUpdate['local'] = false;

		if (res.name) {
			userToUpdate['displayname'] = res.name;
		}

		if (res._misskey_summary) {
			userToUpdate['bio'] = res._misskey_summary;
		} else if (res.summary) {
			userToUpdate['bio'] = res.summary;
		}

		if (res.icon) {
			userToUpdate['avatar'] = res.icon.url;
		}

		if (res.image) {
			userToUpdate['banner'] = res.image.url;
		}

		if (res.backgroundUrl) {
			userToUpdate['background'] = res.backgroundUrl;
		}

		if (res.manuallyApprovesFollowers) {
			userToUpdate['locked'] = res.manuallyApprovesFollowers;
		}

		if (res.suspended) {
			userToUpdate['suspended'] = res.suspended;
		}

		if (res.discoverable) {
			userToUpdate['discoverable'] = res.discoverable;
		}

		if (res.automated) {
			userToUpdate['automated'] = res.automated;
		}

		if (res.isCat) {
			userToUpdate['is_cat'] = res.isCat;
		}

		if (res.speakAsCat) {
			userToUpdate['speak_as_cat'] = res.speakAsCat;
		}

		userToUpdate['updated_at'] = new Date(Date.now()).toISOString();

		if (!res.suspended) {
			userToUpdate['public_key'] = res.publicKey.publicKeyPem.toString();
		}

		await db.getRepository('users').update(userToUpdate);

		console.log('[ap] updated remote actor ' + remoteActorUrl);
	}
}

async function deleteActor(apId) {
	await db.getRepository('users').delete({
		where: {
			ap_id: `${apId}`
		}
	});

	console.log('[ap] deleted remote actor ' + remoteActorUrl);
}

module.exports = updateRemoteActor;
