import config from '../utils/config.js';
import ApImage from './ApImage.js';
import ApActorPublicKey from './ApActorPublicKey.js';
import ApEndpoints from './ApEndpoints.js';

export default class ApActor {
	id: string;

	type: 'Person' | 'Service';

	name?: string;

	manuallyApprovesFollowers: boolean;
	discoverable: boolean;
	noindex: boolean;
	isCat: boolean;
	speakAsCat: boolean;

	publicKey: ApActorPublicKey;

	icon?: ApImage;

	image?: ApImage;

	backgroundUrl?: ApImage;

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

		this.publicKey = new ApActorPublicKey(
			grabbedUser.ap_id + '#main-key',
			grabbedUser.ap_id,
			grabbedUser.public_key
		);

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

		this.backgroundUrl = new ApImage(
			grabbedUser.background,
			grabbedUser.background_alt,
			false
		);

		this.inbox = grabbedUser.inbox;
		this.sharedInbox = 'https://' + new URL(config.url).host + '/inbox';
		this.endpoints = new ApEndpoints();
		this.outbox = grabbedUser.outbox;

		this.followers = grabbedUser.followers_url;
		this.following = grabbedUser.following_url;

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
