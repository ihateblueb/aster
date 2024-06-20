import User from './user.js';

export default class Note {
	id: string;
	visibility: 'public' | 'unlisted' | 'followers' | 'direct';
	replying_to: Note;
	author: User;
	local: boolean;
	cw: boolean;
	edits: NoteEdit[];
	discoverable: boolean;
	automated: boolean;
	avatar: URL;
	banner: URL;
	background: URL;
	bio: string;
	is_cat: boolean;
	speak_as_cat: boolean;
	created_at: string;
	updated_at: string;
	// pinned_notes: Note[];

	constructor(grabbedUser) {
		this.id = grabbedUser.id;
		this.username = grabbedUser.username;
		this.host = grabbedUser.host;
		this.local = grabbedUser.local;
		this.url = new URL(grabbedUser.url);
		this.displayname = grabbedUser.displayname;
		this.locked = grabbedUser.locked;
		this.suspended = grabbedUser.suspended;
		this.deactivated = grabbedUser.deactivated;
		this.discoverable = grabbedUser.discoverable;
		this.automated = grabbedUser.automated;
		this.avatar = new URL(grabbedUser.avatar);
		this.banner = new URL(grabbedUser.banner);
		this.background = new URL(grabbedUser.background);
		this.bio = grabbedUser.bio;
		this.is_cat = grabbedUser.is_cat;
		this.speak_as_cat = grabbedUser.speak_as_cat;
		this.created_at = grabbedUser.created_at;
		this.updated_at = grabbedUser.updated_at;
		// this.pinned_notes = grabbedUser.pinned_notes;
	}

	build() {
		return this;
	}
}
