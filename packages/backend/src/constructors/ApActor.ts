import config from '../utils/config.js';
import ApImage from './ApImage.js';
import ApActorPublicKey from './ApActorPublicKey.js';
import ApEndpoints from './ApEndpoints.js';
import contexts from '../../static/contexts.json' with { type: 'json' };

export default class ApActor {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	type: 'Person' | 'Service';

	name?: string;

	manuallyApprovesFollowers: boolean;
	discoverable: boolean;
	noindex: boolean;
	isCat: boolean;
	speakAsCat: boolean;

	icon?: ApImage;

	image?: ApImage;

	backgroundUrl?: object;

	preferredUsername: string;
	summary?: string;
	_misskey_summary?: string;

	inbox: string;
	sharedInbox: string;
	outbox: string;

	endpoints: ApEndpoints;

	following: string;
	followers: string;

	attatchment?: Object[];

	publicKey: ApActorPublicKey;

	constructor(grabbedUser) {
		this.id = grabbedUser.ap_id;
		this.preferredUsername = grabbedUser.username;
		this.name = grabbedUser.displayname;

		this.type = !grabbedUser.automated ? 'Person' : 'Service';

		this.summary = grabbedUser.bio;
		this._misskey_summary = grabbedUser.bio;

		this.manuallyApprovesFollowers = grabbedUser.locked;
		this.discoverable = grabbedUser.discoverable;
		this.noindex = grabbedUser.indexable ? false : true;
		this.isCat = grabbedUser.is_cat;
		this.speakAsCat = grabbedUser.speak_as_cat;

		this.icon = new ApImage(
			grabbedUser.avatar,
			grabbedUser.avatar_alt,
			false
		);

		this.image = new ApImage(
			grabbedUser.banner,
			grabbedUser.banner_alt,
			false
		);

		this.backgroundUrl = grabbedUser.background;

		this['vcard:bday'] = grabbedUser.birthday;
		this['vcard:Address'] = grabbedUser.location;

		this.inbox = grabbedUser.inbox;
		this.sharedInbox =
			'https://' + new URL(config.get().url).host + '/inbox';
		this.endpoints = new ApEndpoints();
		this.outbox = grabbedUser.outbox;

		this.followers = grabbedUser.followers_url;
		this.following = grabbedUser.following_url;

		this.publicKey = new ApActorPublicKey(
			grabbedUser.ap_id + '#main-key',
			grabbedUser.ap_id,
			grabbedUser.public_key
		);

		/*
		Array.from(grabbedUser.metadata).forEach((metadata) => {
			this.attatchment.push({
				type: 'PropertyValue',
				name: metadata.key,
				value: metadata.value
			});
		});
		*/
	}

	build() {
		return this;
	}
}
