import axios from 'axios';

import db from '../database';

// import updateRemoteActor from './updateRemoteActor';

export default async function getRemoteActor(apId) {
	var grabbedRemoteActorDb = await db.getRepository('users').find({
		where: {
			ap_id: apId
		}
	});

	var grabbedRemoteActor = grabbedRemoteActorDb[0];

	if (grabbedRemoteActor) {
		console.log('[ap] remote actor present in database');
		return grabbedRemoteActor;
	} else {
		console.log('[ap] remote actor not present in database');

		let response;

		await axios
			.get(apId, {
				headers: {
					Accept: 'application/activity+json'
				}
			})
			.then(async (res) => {
				console.log('[ap] fetched actor successfully');
				response = await processNewActor(apId, res);
			})
			.catch((e) => {
				if (e.response && e.response.status === 410) {
					response = 'gone';
				} else {
					console.log(e);
				}
			});

		return response;
	}
}

async function processNewActor(apId, res) {
	if (
		res.data.type === 'Person' &&
		res.data.preferredUsername &&
		res.data.id &&
		res.data.url
	) {
		var actorToInsert = {};

		// this will be generated
		actorToInsert['id'];

		actorToInsert['username'] = res.data.preferredUsername;
		actorToInsert['ap_id'] = res.data.id;
		actorToInsert['url'] = res.data.url;

		actorToInsert['local'] = false;

		if (res.data.name) {
			actorToInsert['displayname'] = res.data.mame;
		}

		if (res.data._misskey_summary) {
			actorToInsert['bio'] = res.data._misskey_summary;
		} else if (res.data.summary) {
			actorToInsert['bio'] = res.data.summary;
		}

		if (res.data.icon) {
			actorToInsert['avatar'] = res.data.icon.url;
		}

		if (res.data.image) {
			actorToInsert['banner'] = res.data.image.url;
		}

		if (res.data.backgroundUrl) {
			actorToInsert['background'] = res.data.backgroundUrl;
		}

		if (res.data.manuallyApprovesFollowers) {
			actorToInsert['locked'] = res.data.manuallyApprovesFollowers;
		}

		if (res.data.suspended) {
			actorToInsert['suspended'] = res.data.suspended;
		}

		if (res.data.discoverable) {
			actorToInsert['discoverable'] = res.data.discoverable;
		}

		if (res.data.automated) {
			actorToInsert['automated'] = res.data.automated;
		}

		if (res.data.isCat) {
			actorToInsert['is_cat'] = res.data.isCat;
		}

		if (res.data.speakAsCat) {
			actorToInsert['speak_as_cat'] = res.data.speakAsCat;
		}

		actorToInsert['created_at'] = new Date(Date.now()).toISOString();

		actorToInsert['updated_at'] = new Date(Date.now()).toISOString();

		if (res.data.publicKey.publicKeyPem) {
			actorToInsert['public_key'] =
				res.data.publicKey.publicKeyPem.toString();
		}

		await db.getRepository('users').insert(actorToInsert);

		console.log('[ap] created remote actor ' + apId);

		return actorToInsert;
	}
}
