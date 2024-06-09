import { v4 as uuidv4 } from 'uuid';

import db from '../database.js';
import logger from '../logger.js';

import sanitize from '../sanitize.js';

export default async function processNewActor(body) {
	if (
		body.type === 'Person' &&
		body.preferredUsername &&
		body.id &&
		body.url
	) {
		var actorToInsert = {};

		// this will be generated
		actorToInsert['id'] = uuidv4();

		actorToInsert['username'] = sanitize(body.preferredUsername);
		actorToInsert['host'] = new URL(body.url).host;
		actorToInsert['ap_id'] = body.id;

		if (body.inbox) {
			actorToInsert['inbox'] = body.inbox;
		} else if (body.sharedInbox) {
			actorToInsert['inbox'] = body.sharedInbox;
		} else {
			actorToInsert['inbox'] = body.endpoints.sharedInbox;
		}

		actorToInsert['url'] = body.url;

		actorToInsert['local'] = false;

		if (body.name) {
			actorToInsert['displayname'] = sanitize(body.name);
		}

		if (body._misskey_summary) {
			actorToInsert['bio'] = sanitize(body._misskey_summary);
		} else if (body.summary) {
			actorToInsert['bio'] = sanitize(body.summary);
		}

		if (body.icon) {
			actorToInsert['avatar'] = body.icon.url;
		}

		if (body.image) {
			actorToInsert['banner'] = body.image.url;
		}

		if (body.backgroundUrl) {
			actorToInsert['background'] = body.backgroundUrl;
		}

		if (body.manuallyApprovesFollowers) {
			actorToInsert['locked'] = body.manuallyApprovesFollowers;
		}

		if (body.suspended) {
			actorToInsert['suspended'] = body.suspended;
		}

		if (body.discoverable) {
			actorToInsert['discoverable'] = body.discoverable;
		}

		if (body.automated) {
			actorToInsert['automated'] = body.automated;
		}

		if (body.isCat) {
			actorToInsert['is_cat'] = body.isCat;
		}

		if (body.speakAsCat) {
			actorToInsert['speak_as_cat'] = body.speakAsCat;
		}

		actorToInsert['created_at'] = new Date(Date.now()).toISOString();

		actorToInsert['updated_at'] = new Date(Date.now()).toISOString();

		actorToInsert['following_url'] = body.following;
		actorToInsert['followers_url'] = body.followers;

		if (body.publicKey.publicKeyPem) {
			actorToInsert['public_key'] =
				body.publicKey.publicKeyPem.toString();
		}

		await db.getRepository('users').insert(actorToInsert);

		logger('info', 'ap', 'created remote actor ' + body.id);

		return actorToInsert;
	}
}
