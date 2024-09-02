import ApiNote from './note.js';
import ApiUser from './user.js';

export default class ApiRepeat {
	id: string;
	ap_id: string;
	local: boolean;

	author: ApiUser;

	created_at: string;
	visibility: string;

	note: ApiNote;

	constructor(grabbedRepeat, generatedNote: ApiNote, grabbedAuthor: ApiUser) {
		this.id = grabbedRepeat.id;
		this.ap_id = grabbedRepeat.ap_id;
		this.local = grabbedRepeat.local;

		this.author = grabbedAuthor;

		this.created_at = grabbedRepeat.created_at;
		this.visibility = grabbedRepeat.visibility;

		this.note = generatedNote;
	}

	build() {
		return this;
	}
}
