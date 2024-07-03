import { Note } from '../entities/Note.js';
import { NoteReact } from '../entities/NoteReact.js';
import { User } from '../entities/User.js';

export default class ApiNote {
	id: string;
	ap_id: string;
	created_at: string;
	visibility: string;

	replying_to?: ApiNote;
	author: User;

	local: boolean;
	cw?: string;
	content: string;

	reactions: {
		
	}

	constructor(
		grabbedNote: Note,
		grabbedAuthor: User,
		grabbedReactions?: NoteReact,
		grabbedReplyingTo?: Note,
		grabbedReplyingToAuthor?: User
	) {}

	build() {
		return this;
	}
}
