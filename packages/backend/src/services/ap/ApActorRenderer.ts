import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';
import ApImageRenderer from './ApImageRenderer.js';

class ApActorRenderer {
	public render(user: ObjectLiteral): ApObject {
		const apActor = {
			'@context': context,

			type: user.automated ? 'Service' : 'Person',

			id: user.apId,

			preferredUsername: user.username,
			name: user.displayName,
			url: ConfigService.url.href + '@' + user.username,

			summary: user.bio,
			_misskey_summary: user.bio,

			'vcard:bday': user.birthday,
			'vcard:Address': user.location,

			sensitive: user.sensitive,
			discoverable: user.discoverable,
			manuallyApprovesFollowers: user.locked,
			noindex: !user.indexable,
			isCat: user.isCat,
			speakAsCat: user.speakAsCat,

			icon: user.avatar
				? ApImageRenderer.render(
						user.avatar,
						user.sensitive,
						user.avatarAlt
					)
				: undefined,
			image: user.banner
				? ApImageRenderer.render(
						user.banner,
						user.sensitive,
						user.bannerAlt
					)
				: undefined,

			inbox: user.inbox,
			outbox: user.outbox,
			sharedInbox: ConfigService.url.href + 'inbox',
			endpoints: {
				sharedInbox: ConfigService.url.href + 'inbox'
			},

			followers: user.followersUrl,
			following: user.followingUrl,

			publicKey: {
				id: user.apId + '#main-key',
				type: 'Key',
				owner: user.apId,
				publicKeyPem: user.publicKey
			}
		};

		return apActor;
	}
}

export default new ApActorRenderer();
