import * as punycode from 'node:punycode';

import { ObjectLiteral } from 'typeorm';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import IdService from '../IdService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApActorService {
	public async get(apId: ApId) {
		const actor = await UserService.get({ apId: apId });
		if (actor) return actor;

		const resolvedActor = await ApResolver.resolveSigned(apId);

		console.log(resolvedActor);

		if (!resolvedActor) return false;
		if (!['Person', 'Service', 'Application'].includes(resolvedActor.type))
			return false;

		return await this.register(resolvedActor);
	}

	public async register(body: ObjectLiteral) {
		if (!ApValidationService.validBody(body)) return false;

		const id = IdService.generate();

		const user = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			host: punycode.toASCII(new URL(body.id).host),
			local: false,
			activated: true
		};

		const moderatedInstance = await ModeratedInstanceService.get({
			host: punycode.toASCII(reduceSubdomain(user.host))
		});

		if (!body.preferredUsername) return false;
		user['username'] = SanitizerService.sanitize(body.preferredUsername);

		if (body.name)
			user['displayName'] = SanitizerService.sanitize(body.name);

		if (body.summary) user['bio'] = SanitizerService.sanitize(body.summary);
		if (body._misskey_summary)
			user['bio'] = SanitizerService.sanitize(body._misskey_summary);

		if (body['vcard:Address'])
			user['location'] = SanitizerService.sanitize(body['vcard:Address']);

		try {
			if (body['vcard:bday'])
				user['birthday'] = new Date(
					body['vcard:birthday']
				).toISOString();
		} catch (err) {
			console.log(err);
		}

		// todo: false positives?
		if (body.sensitive) user['sensitive'] = true;
		if (moderatedInstance && !moderatedInstance.sensitive)
			user['sensitive'] = true;

		if (body.discoverable) user['discoverable'] = true;
		if (body.manuallyApprovesFollowers) user['locked'] = true;
		if (body.noindex) user['indexable'] = false;
		if (body.isCat) user['isCat'] = true;
		if (body.speakAsCat) user['speakAsCat'] = true;

		if (body.published)
			user['createdAt'] = new Date(body.published).toISOString();
		if (!body.published) user['createdAt'] = new Date().toISOString();

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
		if (body.endpoints && body.endpoints.sharedInbox)
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
