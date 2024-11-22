import * as uuid from 'uuid';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApActorService {
	public async get(apId: string) {
		let url = new URL(apId);

		let actor = await UserService.get({ apId: apId });
		if (actor) return actor;

		let resolvedActor = await ApResolver.resolveSigned(apId);

		console.log(resolvedActor);

		if (!resolvedActor) return false;
		if (!['Person', 'Service', 'Application'].includes(resolvedActor.type))
			return false;

		return await this.register(resolvedActor);
	}

	public async register(body) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body); //todo: remove

		const id = uuid.v7();

		let user = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			host: new URL(body.id).host,
			local: false,
			activated: true,
			createdAt: new Date().toISOString()
		};

		if (!body.preferredUsername) return false;
		user['username'] = SanitizerService.sanitize(body.preferredUsername);

		if (body.name)
			user['displayName'] = SanitizerService.sanitize(body.name);

		if (body.summary) user['bio'] = SanitizerService.sanitize(body.summary);
		if (body._misskey_summary)
			user['bio'] = SanitizerService.sanitize(body._misskey_summary);

		if (body['vcard:Address'])
			user['location'] = SanitizerService.sanitize(body['vcard:Address']);
		if (body['vcard:bday'])
			user['birthday'] = new Date(body['vcard:birthday']).toISOString();

		if (body.sensitive) user['sensitive'] = true;
		if (body.discoverable) user['discoverable'] = true;
		if (body.manuallyApprovesFollowers) user['locked'] = true;
		if (body.noindex) user['indexable'] = false;
		if (body.isCat) user['isCat'] = true;
		if (body.speakAsCat) user['speakAsCat'] = true;

		if (body.icon && body.icon.url)
			user['avatar'] = SanitizerService.sanitize(body.icon.url);
		if (body.icon && body.icon.description)
			user['avatarAlt'] = SanitizerService.sanitize(
				body.icon.description
			);
		if (body.icon && body.icon.name)
			user['avatarAlt'] = SanitizerService.sanitize(body.icon.name);

		if (body.image && body.image.url)
			user['banner'] = SanitizerService.sanitize(body.image.url);
		if (body.image && body.image.description)
			user['bannerAlt'] = SanitizerService.sanitize(
				body.image.description
			);
		if (body.image && body.image.name)
			user['bannerAlt'] = SanitizerService.sanitize(body.image.name);

		if (body.inbox) user['inbox'] = SanitizerService.sanitize(body.inbox);
		if (body.sharedInbox)
			user['inbox'] = SanitizerService.sanitize(body.sharedInbox);
		if (body.endpoints.sharedInbox)
			user['inbox'] = SanitizerService.sanitize(
				body.endpoints.sharedInbox
			);

		if (body.outbox)
			user['outbox'] = SanitizerService.sanitize(body.outbox);

		if (body.followers)
			user['followersUrl'] = SanitizerService.sanitize(body.followers);
		if (body.following)
			user['followingUrl'] = SanitizerService.sanitize(body.following);

		if (body.publicKey && body.publicKey.publicKeyPem)
			user['publicKey'] = SanitizerService.sanitize(
				body.publicKey.publicKeyPem
			);

		console.log(user); //todo: remove

		await db
			.getRepository('user')
			.insert(user)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote user');
			});

		return await UserService.get({ id: id });
	}
}

export default new ApActorService();
