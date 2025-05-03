import * as punycode from 'node:punycode';

import { ObjectLiteral } from 'typeorm';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import reduceSubdomain from '../../utils/reduceSubdomain.js';
import tryUrl from '../../utils/tryUrl.js';
import CacheService from '../CacheService.js';
import IdService from '../IdService.js';
import MfmService from '../MfmService.js';
import ModeratedInstanceService from '../ModeratedInstanceService.js';
import SanitizerService from '../SanitizerService.js';
import TimeService from '../TimeService.js';
import UserService from '../UserService.js';
import ApEmojiService from './ApEmojiService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApActorService {
	public async get(apId: ApId) {
		const actor = await UserService.get({ apId: apId });

		if (actor) {
			if (
				TimeService.isTimeAgo(
					new Date(actor.updatedAt),
					TimeService.day
				)
			) {
				logger.debug('actor', 'refetching actor ' + actor.apId);
				return await this.refetch(apId);
			}

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
		if (resolvedActor?.error === 'Gone')
			await UserService.delete({ apId: apId });
		if (!['Person', 'Service', 'Application'].includes(resolvedActor.type))
			return false;

		return await this.update(resolvedActor);
	}

	public async actorToUser(
		body: ApObject,
		base?: ObjectLiteral,
		notInitial?: boolean
	): Promise<Partial<ObjectLiteral>> {
		// todo: make more tolerant of weird responses.
		let user = base ?? {
			host: punycode.toASCII(reduceSubdomain(new URL(body.id).host))
		};

		if (!body.id) throw new Error('no apId present');

		const moderatedInstance = await ModeratedInstanceService.get({
			host: punycode.toASCII(reduceSubdomain(new URL(body.id).host))
		});

		if (!body.preferredUsername)
			throw new Error('no preferredUsername present');

		const host = new URL(body.id).host;

		user['username'] = SanitizerService.sanitize(body.preferredUsername);

		if (body.name)
			user['displayName'] = SanitizerService.sanitize(
				MfmService.localize(body.name, host)
			);

		if (body.summary)
			user['bio'] = SanitizerService.sanitize(
				MfmService.localize(body.summary, host)
			);
		if (body._misskey_summary)
			user['bio'] = SanitizerService.sanitize(
				MfmService.localize(body._misskey_summary, host)
			);

		if (body['vcard:Address'])
			user['location'] = SanitizerService.sanitize(body['vcard:Address']);

		try {
			if (body['vcard:bday'])
				user['birthday'] = new Date(
					body['vcard:birthday']
				).toISOString();
		} catch (_) {}

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

		if (!notInitial) {
			if (!user.createdAt) user['createdAt'] = new Date().toISOString();
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

		user['emojis'] = [];

		if (body.tag && Array.isArray(body.tag)) {
			for (const tag of body.tag) {
				if (tag.type === 'Emoji' && tag.id) {
					let emoji = await ApEmojiService.get(tag.id);

					if (emoji) {
						user.emojis.push(emoji.id);
					} else {
						await ApEmojiService.register(tag).then((e) => {
							if (e) user.emojis.push(e.id);
						});
					}
				}
			}
		}

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

		let updatedUser = await this.actorToUser(
			body,
			{
				updatedAt: new Date().toISOString()
			},
			true
		);

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

		const user = await UserService.get({ apId: body.id });

		await CacheService.scanAndDel('user*' + user.id);

		return user;
	}
}

export default new ApActorService();
