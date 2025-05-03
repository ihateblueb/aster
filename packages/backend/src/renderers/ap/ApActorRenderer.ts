import { ObjectLiteral } from 'typeorm';

import ConfigService from '../../services/ConfigService.js';
import context from '../../static/context.js';
import ApImageRenderer from './ApImageRenderer.js';
import ApKeyRenderer from './ApKeyRenderer.js';

class ApActorRenderer {
	public render(user: ObjectLiteral): ApObject {
		let actor = {
			'@context': context,

			'type': user.automated ? 'Service' : 'Person',

			'id': user.apId,
			'url': ConfigService.url.href + '@' + user.username
		};

		actor['preferredUsername'] = user.username;
		if (user.displayName) actor['name'] = user.displayName;

		if (user.avatar)
			actor['icon'] = ApImageRenderer.render(
				user.avatar,
				user.sensitive,
				user.avatarAlt
			);
		if (user.banner)
			actor['image'] = ApImageRenderer.render(
				user.banner,
				user.sensitive,
				user.bannerAlt
			);

		if (user.bio) {
			actor['summary'] = user.bio;
			actor['_misskey_summary'] = user.bio;
		}

		actor['sensitive'] = user.sensitive;
		actor['discoverable'] = user.discoverable;
		actor['manuallyApprovesFollowers'] = user.locked;
		actor['noindex'] = !user.indexable;
		actor['isCat'] = user.isCat;
		actor['speakAsCat'] = user.speakAsCat;

		if (user.birthday) actor['vcard:bday'] = user.birthday;
		if (user.location) actor['vcard:Address'] = user.location;

		actor['inbox'] = user.inbox;
		actor['outbox'] = user.outbox;
		actor['sharedInbox'] = ConfigService.url.href + 'inbox';
		actor['endpoints'] = {
			sharedInbox: ConfigService.url.href + 'inbox'
		};

		actor['followers'] = user.followersUrl;
		actor['following'] = user.followingUrl;

		actor['publicKey'] = ApKeyRenderer.render(user.apId, user.publicKey);

		return actor;
	}
}

export default new ApActorRenderer();
