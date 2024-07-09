import { User } from '../entities/User.js';

export default class ApiNote {
	id: string;
	ap_id: string;
	created_at: string;
	visibility: string;

	replying_to?: ApiNote;
	author: object;
	instance: object;

	local: boolean;
	cw?: string;
	content: string;

	attachments?: [];
	emojis?: [];
	reactions?: [];

	constructor(
		grabbedNote,
		grabbedAuthor,
		grabbedInstance?,
		grabbedAttachments?,
		grabbedEmojis?,
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
		this.instance = grabbedInstance;
		this.local = grabbedNote.local;
		this.cw = grabbedNote.cw;
		this.content = grabbedNote.content;
		this.attachments =
			grabbedAttachments.length > 0 ? grabbedAttachments : null;
		this.emojis = grabbedEmojis.length > 0 ? grabbedEmojis : null;
		this.reactions = sortedReactions.length > 0 ? sortedReactions : null;
	}

	build() {
		return this;
	}
}
