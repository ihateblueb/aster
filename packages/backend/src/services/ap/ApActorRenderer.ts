import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';
import ApImageRenderer from './ApImageRenderer.js';
import ApKeyRenderer from './ApKeyRenderer.js';

class ApActorRenderer {
	public render(user: ObjectLiteral): ApObject {
		return {
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

			publicKey: ApKeyRenderer.render(user.apId, user.publicKey)
		};
	}
}

export default new ApActorRenderer();
