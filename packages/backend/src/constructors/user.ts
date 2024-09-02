import ApiNote from './note.js';

export default class ApiUser {
	id: string;
	ap_id: string;
	url: string;

	local: boolean;

	username: string;
	host: string;

	displayname: string;
	bio: string;
	location: string;
	birthday: string;

	inbox: string;
	outbox: string;

	locked: boolean;
	suspended: boolean;
	deactivated: boolean;
	discoverable: boolean;
	indexable: boolean;
	automated: boolean;

	avatar: string;
	avatar_alt: string;

	banner: string;
	banner_alt: string;

	background: string;
	background_alt: string;

	is_cat: boolean;
	speak_as_cat: boolean;

	admin: boolean;
	mod: boolean;

	created_at: string;
	updated_at: string;

	following_url: string;
	followers_url: string;

	// TODO: fix circular logic, ApiNote has ApiUser and ApiUser has ApiNote
	pinned_notes: ApiNote[];

	public_key: string;

	relationship?: object;

	constructor(grabbedUser, relationship?) {
		this.id = grabbedUser.id;
		this.ap_id = grabbedUser.ap_id;
		this.url = grabbedUser.url;

		this.local = grabbedUser.local;

		this.username = grabbedUser.username;
		this.host = grabbedUser.host;

		this.displayname = grabbedUser.displayname;
		this.bio = grabbedUser.bio;
		this.location = grabbedUser.location;
		this.birthday = grabbedUser.birthday;

		this.inbox = grabbedUser.inbox;
		this.outbox = grabbedUser.outbox;

		this.locked = grabbedUser.locked;
		this.suspended = grabbedUser.suspended;
		this.deactivated = grabbedUser.deactivated;
		this.discoverable = grabbedUser.discoverable;
		this.discoverable = grabbedUser.discoverable;
		this.indexable = grabbedUser.indexable;
		this.automated = grabbedUser.automated;

		this.avatar = grabbedUser.avatar;
		this.avatar_alt = grabbedUser.avatar_alt;

		this.banner = grabbedUser.banner;
		this.banner_alt = grabbedUser.banner_alt;

		this.background = grabbedUser.background;
		this.background_alt = grabbedUser.background_alt;

		this.is_cat = grabbedUser.is_cat;
		this.speak_as_cat = grabbedUser.speak_as_cat;

		this.admin = grabbedUser.admin;
		this.mod = grabbedUser.mod;

		this.created_at = grabbedUser.created_at;
		this.updated_at = grabbedUser.updated_at;

		this.following_url = grabbedUser.following_url;
		this.followers_url = grabbedUser.followers_url;

		this.pinned_notes = grabbedUser.pinned_notes;

		this.public_key = grabbedUser.public_key;

		if (relationship) {
			this.relationship = relationship;
		}
	}

	build() {
		return this;
	}
}
