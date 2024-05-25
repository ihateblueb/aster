import db from '../database.js';
import logger from '../logger.js';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// import updateRemoteActor from './updateRemoteActor';

export default async function getRemoteActor(apId) {
	var grabbedRemoteActor = await db.getRepository('users').findOne({
		where: {
			ap_id: apId
		}
	});

	if (grabbedRemoteActor) {
		logger('debug', 'ap', 'remote actor present in database');
		return grabbedRemoteActor;
	} else {
		logger('debug', 'ap', 'remote actor not present in database');

		let response;

		await axios
			.get(apId, {
				headers: {
					Accept: 'application/activity+json'
				}
			})
			.then(async (res) => {
				logger('debug', 'ap', 'fetched actor sucessfully');
				response = await processNewActor(apId, res);
			})
			.catch((e) => {
				// in case they can't be fetched, this will be sent so they are ignored.
				if (e.response && e.response.status === 410) {
					response = 'gone';
				} else if (e.response && e.response.status === 401) {
					response = 'gone';
				} else {
					logger('error', 'ap', e);
				}
			});

		return await response;
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
		actorToInsert['id'] = uuidv4();

		actorToInsert['username'] = res.data.preferredUsername;
		actorToInsert['host'] = new URL(res.data.url).host;
		actorToInsert['ap_id'] = res.data.id;

		if (res.data.inbox) {
			actorToInsert['inbox'] = res.data.inbox;
		} else if (res.data.sharedInbox) {
			actorToInsert['inbox'] = res.data.sharedInbox;
		} else {
			actorToInsert['inbox'] = res.data.endpoints.sharedInbox;
		}

		actorToInsert['url'] = res.data.url;

		actorToInsert['local'] = false;

		if (res.data.name) {
			actorToInsert['displayname'] = res.data.name;
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

		actorToInsert['following_url'] = res.data.following;
		actorToInsert['followers_url'] = res.data.followers;

		if (res.data.publicKey.publicKeyPem) {
			actorToInsert['public_key'] =
				res.data.publicKey.publicKeyPem.toString();
		}

		await db.getRepository('users').insert(actorToInsert);

		logger('info', 'ap', 'created remote actor ' + apId);

		return actorToInsert;
	}
}
