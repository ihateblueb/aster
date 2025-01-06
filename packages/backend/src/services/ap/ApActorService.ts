import * as punycode from 'node:punycode';

import { ObjectLiteral } from 'typeorm';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import tryUrl from '../../utils/tryUrl.js';
import IdService from '../IdService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import SanitizerService from '../SanitizerService.js';
import UserService from '../UserService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApActorService {
	public async get(apId: ApId) {
		const actor = await UserService.get({ apId: apId });

		if (actor) {
			// if actorUpdatedAt greater than an hour ago
			/*
			if (Number(new Date(actor.updatedAt)) > Date.now() - 1000 * 60 * 60)
				return await this.refetch(apId);
			*/

			return actor;
		}

		const resolvedActor = await ApResolver.resolveSigned(apId);

		console.log(resolvedActor);

		if (!resolvedActor) return false;
		if (!['Person', 'Service', 'Application'].includes(resolvedActor.type))
			return false;

		return await this.register(resolvedActor);
	}

	public async refetch(apId: ApId) {
		const resolvedActor = await ApResolver.resolveSigned(apId);
		console.log(resolvedActor);

		if (!resolvedActor) return false;
		if (!['Person', 'Service', 'Application'].includes(resolvedActor.type))
			return false;

		return await this.update(resolvedActor);
	}

	public async actorToUser(
		body: ApObject,
		base?: ObjectLiteral
	): Promise<ObjectLiteral> {
		// todo: make more tolerant of weird responses.
		let user = base ?? {};

		user['updatedAt'] = new Date().toISOString();

		if (!body.id) throw new Error('no apId present');

		const moderatedInstance = await ModeratedInstanceService.get({
			host: punycode.toASCII(reduceSubdomain(new URL(body.id).host))
		});

		if (!body.preferredUsername)
			throw new Error('no preferredUsername present');

		user['username'] = SanitizerService.sanitize(body.preferredUsername);

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
		} catch (_) {
			/* ignore */
		}

		if (body.sensitive) user['sensitive'] = true;
		if (moderatedInstance && !moderatedInstance.sensitive)
			user['sensitive'] = true;

		if (body.discoverable) user['discoverable'] = true;
		if (body.manuallyApprovesFollowers) user['locked'] = true;
		if (body.noindex) user['indexable'] = false;
		if (body.isCat) user['isCat'] = true;
		if (body.speakAsCat) user['speakAsCat'] = true;

		try {
			if (body.published)
				user['createdAt'] = new Date(body.published).toISOString();
		} catch (_) {
			/* ignore */
		}

		/* avatar */
		if (body.icon && body.icon.url)
			user['avatar'] = SanitizerService.sanitize(body.icon.url);
		if (body.icon && body.icon.description)
			user['avatarAlt'] = SanitizerService.sanitize(
				body.icon.description
			);
		if (body.icon && body.icon.name)
			user['avatarAlt'] = SanitizerService.sanitize(body.icon.name);
		if (body.icon && !body.icon.url)
			user['avatar'] = SanitizerService.sanitize(body.icon);

		/* banner */
		if (body.image && body.image.url)
			user['banner'] = SanitizerService.sanitize(body.image.url);
		if (body.image && body.image.description)
			user['bannerAlt'] = SanitizerService.sanitize(
				body.image.description
			);
		if (body.image && body.image.name)
			user['bannerAlt'] = SanitizerService.sanitize(body.image.name);
		if (body.image && !body.image.url)
			user['banner'] = SanitizerService.sanitize(body.image);

		if (body.inbox) user['inbox'] = SanitizerService.sanitize(body.inbox);

		if (body.sharedInbox)
			user['inbox'] = SanitizerService.sanitize(body.sharedInbox);

		if (
			body.endpoints &&
			body.endpoints.sharedInbox &&
			tryUrl(body.endpoints.sharedInbox)
		)
			user['inbox'] = SanitizerService.sanitize(
				body.endpoints.sharedInbox
			);

		if (body.outbox)
			user['outbox'] = SanitizerService.sanitize(body.outbox);

		if (body.followers)
			user['followersUrl'] = SanitizerService.sanitize(body.followers);
		if (body.following)
			user['followingUrl'] = SanitizerService.sanitize(body.following);

		return user;
	}

	public async register(body: ApObject) {
		if (!ApValidationService.validBody(body)) return false;

		const id = IdService.generate();

		let user: ObjectLiteral = {
			id: id,
			apId: SanitizerService.sanitize(body.id),
			host: punycode.toASCII(new URL(body.id).host),
			local: false,
			activated: true
		};

		if (body.publicKey && body.publicKey.publicKeyPem)
			user['publicKey'] = SanitizerService.sanitize(
				body.publicKey.publicKeyPem
			);

		user = await this.actorToUser(body, user);

		await db
			.getRepository('user')
			.insert(user)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to insert remote user');
			});

		return await UserService.get({ id: id });
	}

	public async update(body: ApObject) {
		if (!ApValidationService.validBody(body)) return false;

		let updatedUser = await this.actorToUser(body);

		await db
			.getRepository('user')
			.update(
				{
					apId: body.id
				},
				updatedUser
			)
			.catch((err) => {
				console.log(err);
				logger.error('ap', 'failed to update remote user');
			});

		return await UserService.get({ apId: body.id });
	}
}

export default new ApActorService();
