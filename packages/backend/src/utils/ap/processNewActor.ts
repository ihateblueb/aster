import db from '../database.js';
import logger from '../logger.js';
import logger from '../logger.js';
import sanitize from '../sanitize.js';
import { v4 as uuidv4 } from 'uuid';
import getSigned from './getSigned.js';
import fromHtml from '../mfm/fromHtml.js';

export default async function processNewActor(body) {
	if (body.preferredUsername && body.id && body.url && body.outbox) {
		let actorToInsert = {
			id: ''
		};

		// this will be generated
		actorToInsert['id'] = uuidv4();

		actorToInsert['username'] = sanitize(body.preferredUsername);
		actorToInsert['host'] = new URL(sanitize(body.url)).host;
		actorToInsert['ap_id'] = sanitize(body.id);

		if (body.inbox) {
			actorToInsert['inbox'] = sanitize(body.inbox);
		} else if (body.sharedInbox) {
			actorToInsert['inbox'] = sanitize(body.sharedInbox);
		} else {
			actorToInsert['inbox'] = sanitize(body.endpoints.sharedInbox);
		}

		actorToInsert['outbox'] = sanitize(body.outbox);

		if (body.type === 'Service') {
			actorToInsert['automated'] = true;
		}

		actorToInsert['url'] = sanitize(body.url);

		actorToInsert['local'] = false;

		if (body.name) {
			actorToInsert['displayname'] = sanitize(body.name);
		}

		if (body._misskey_summary) {
			actorToInsert['bio'] = sanitize(body._misskey_summary);
		} else if (body.summary) {
			actorToInsert['bio'] = sanitize(await fromHtml(body.summary));
		}

		if (body.icon) {
			actorToInsert['avatar'] = sanitize(body.icon.url);
		}

		if (body.image) {
			actorToInsert['banner'] = sanitize(body.image.url);
		}

		if (body.backgroundUrl) {
			actorToInsert['background'] = sanitize(body.backgroundUrl);
		}

		if (body.manuallyApprovesFollowers) {
			actorToInsert['locked'] = true;
		} else if (!body.manuallyApprovesFollowers) {
			actorToInsert['locked'] = false;
		}

		if (body.suspended) {
			actorToInsert['suspended'] = true;
		} else if (!body.suspended) {
			actorToInsert['suspended'] = false;
		}

		if (body.discoverable) {
			actorToInsert['discoverable'] = true;
		} else if (!body.discoverable) {
			actorToInsert['discoverable'] = false;
		}

		if (body.isCat) {
			actorToInsert['is_cat'] = true;
		} else if (!body.isCat) {
			actorToInsert['is_cat'] = false;
		}

		if (body.speakAsCat) {
			actorToInsert['speak_as_cat'] = true;
		} else if (!body.speakAsCat) {
			actorToInsert['speak_as_cat'] = false;
		}

		actorToInsert['created_at'] = new Date(Date.now()).toISOString();

		actorToInsert['updated_at'] = new Date(Date.now()).toISOString();

		actorToInsert['following_url'] = sanitize(body.following);

		try {
			let grabbedFollowing = await getSigned(body.following);

			if (!grabbedFollowing.error && grabbedFollowing.data) {
				if (grabbedFollowing.data.totalItems) {
					actorToInsert['total_following'] = sanitize(
						grabbedFollowing.data.totalItems
					);
				}
			}
		} catch (e) {
			logger.debug('ap', e);
		}

		actorToInsert['followers_url'] = sanitize(body.followers);

		try {
			let grabbedFollowers = await getSigned(body.followers);

			if (!grabbedFollowers.error && grabbedFollowers.data) {
				if (grabbedFollowers.data.totalItems) {
					actorToInsert['total_followers'] = sanitize(
						grabbedFollowers.data.totalItems
					);
				}
			}
		} catch (e) {
			logger.debug('ap', e);
		}

		if (body['vcard:bday']) {
			actorToInsert['birthday'] = sanitize(body['vcard:bday']);
		}

		if (body['vcard:Address']) {
			actorToInsert['location'] = sanitize(body['vcard:Address']);
		}

		if (body.publicKey.publicKeyPem) {
			actorToInsert['public_key'] = sanitize(
				body.publicKey.publicKeyPem.toString()
			);
		}

		await db.getRepository('user').insert(actorToInsert);

		logger.info('ap', 'created remote actor ' + body.id);

		return actorToInsert;
	}
}
