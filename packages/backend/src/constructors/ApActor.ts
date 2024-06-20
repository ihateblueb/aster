import { User } from "../entities/User.js";

export default class ApActor {
	id: string;

	type: 'Person' | 'Service';

	name: string;

    manuallyApprovesFollowers: boolean;
    discoverable: boolean;
    noindex: boolean;
    isCat: boolean;
    speakAsCat: boolean;

    publicKey: {
        id: string;
        readonly type: 'Key';
        owner: string;
        publicKeyPem: string;
    }

    icon?: {
        readonly type: 'Image';
        url?: string;
        description?: string;
        sensitive: false;
    };

    image?: {
        readonly type: 'Image';
        url?: string;
        description?: string;
        sensitive: false;
    };

    backgroundUrl?: {
        readonly type: 'Image';
        url?: string;
        description?: string;
        sensitive: false;
    };;

    preferredUsername?: string;
    summary?: string;
    _misskey_summary?: string;

	constructor(grabbedUser: User) {
		this.id = grabbedUser.ap_id;
        this.name = grabbedUser.username;

        this.preferredUsername = grabbedUser.displayname;
        this.summary = grabbedUser.bio;
        this._misskey_summary = grabbedUser.bio; 

        this.manuallyApprovesFollowers = grabbedUser.locked;
        this.discoverable = grabbedUser.discoverable;
        this.noindex = grabbedUser.indexable ? false : true;
        this.isCat = grabbedUser.is_cat;
        this.speakAsCat = grabbedUser.speak_as_cat;

        this.publicKey.id = grabbedUser.ap_id + '#main-key';
        this.publicKey.owner = grabbedUser.ap_id;
        this.publicKey.publicKeyPem = grabbedUser.public_key;

        this.icon.url = grabbedUser.avatar;
        this.icon.description = grabbedUser.avatar_alt;

        this.image.url = grabbedUser.banner;
        this.image.description = grabbedUser.banner_alt;

        this.backgroundUrl.url = grabbedUser.background;
        this.backgroundUrl.description = grabbedUser.background_alt;

	}
}
