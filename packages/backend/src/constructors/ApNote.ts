import { Note } from "../entities/Note.js";

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
	source: {
		content: string;
		mediaType: string;
	};

	published: string;
	sensitive: boolean;
	directMessage: boolean;
	visibility: 'public' | 'unlisted' | 'followers' | 'direct';

	inReplyTo?: string;

	to?: string[];
	cc?: string[];

	attachment?: object[];
	tag?: object[];

	constructor(grabbedNote: Note) {
		this.id = grabbedNote.ap_id;
		this.attributedTo = grabbedNote.author.ap_id;
		this.actor = grabbedNote.author.ap_id;

		if (grabbedNote.replying_to) {
			this.inReplyTo = grabbedNote.replying_to.ap_id;
		}

		this.subject = grabbedNote.cw;
		this.content = grabbedNote.content;
		this.source.content = grabbedNote.content;
		this.source.mediaType = 'text/x.misskeymarkdown';

		this.published = grabbedNote.created_at
		this.sensitive = (grabbedNote.cw) ? true : false;

		if (grabbedNote.visibility === 'public') {
			this.directMessage = false;
			this.visibility = 'public'

			this.to = [ 'https://www.w3.org/ns/activitystreams#Public' ]
		} else if (grabbedNote.visibility === 'unlisted') {
			this.directMessage = false;
			this.visibility = 'unlisted'

			this.to = [ grabbedNote.author.followers_url ]
			this.cc = [ 'https://www.w3.org/ns/activitystreams#Public' ]
		} else if (grabbedNote.visibility === 'followers') {
			this.directMessage = false;
			this.visibility = 'followers'

			this.to = [ grabbedNote.author.followers_url ]
		} else if (grabbedNote.visibility === 'direct') {
			this.directMessage = true;
			this.visibility = 'direct'
			
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
