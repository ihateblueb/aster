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

	pinned_notes: ApiNote[];

	public_key: string;

	constructor() {}

	build() {
		return this;
	}
}
