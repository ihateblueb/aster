import { User } from '../entities/User.js';

export default class ApiNote {
	id: string;
	ap_id: string;
	created_at: string;
	visibility: string;

	replying_to?: ApiNote;
	author: object;

	local: boolean;
	cw?: string;
	content: string;

	reactions: {};

	constructor(
		grabbedNote,
		grabbedAuthor,
		sortedReactions?,
		grabbedReplyingTo?: User,
		grabbedReplyingToAuthor?
	) {
		this.id = grabbedNote.id;
		this.ap_id = grabbedNote.ap_id;
		this.created_at = grabbedNote.created_at;
		this.visibility = grabbedNote.visibility;
		this.replying_to = grabbedNote.replying_to;
		this.author = grabbedAuthor;
		this.local = grabbedNote.local;
		this.cw = grabbedNote.cw;
		this.content = grabbedNote.content;
		this.reactions = sortedReactions;
	}

	build() {
		return this;
	}
}
