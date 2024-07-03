import { Note } from '../entities/Note.js';
import { User } from '../entities/User.js';

export default class ApNote {
	id: string;

	readonly type: 'Note';

	attributedTo: string;
	actor: string;

	context: string;
	conversation: string;

	subject: string;
	content: string;
	contentMap: object;

	published: string;
	sensitive: boolean;
	directMessage: boolean;
	visibility: 'public' | 'unlisted' | 'followers' | 'direct';

	inReplyTo?: string;

	to?: string[];
	cc?: string[];

	attachment?: object[];
	tag?: object[];

	constructor(grabbedNote, author, replying_to?) {
		this.id = grabbedNote.ap_id;
		this.attributedTo = author.ap_id;
		this.actor = author.ap_id;

		if (grabbedNote.replying_to) {
			this.inReplyTo = replying_to.ap_id;
		}

		this.subject = grabbedNote.cw;
		this.content = grabbedNote.content;

		this.published = grabbedNote.created_at;
		this.sensitive = grabbedNote.cw ? true : false;

		if (grabbedNote.visibility === 'public') {
			this.directMessage = false;
			this.visibility = 'public';

			this.to = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (grabbedNote.visibility === 'unlisted') {
			this.directMessage = false;
			this.visibility = 'unlisted';

			this.to = [author.followers_url];
			this.cc = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (grabbedNote.visibility === 'followers') {
			this.directMessage = false;
			this.visibility = 'followers';

			this.to = [author.followers_url];
		} else if (grabbedNote.visibility === 'direct') {
			this.directMessage = true;
			this.visibility = 'direct';

			// this needs to be figured out later
			//this.to = []
			//this.cc = []
		}

		// collection of replies?
	}

	build() {
		return this;
	}
}
