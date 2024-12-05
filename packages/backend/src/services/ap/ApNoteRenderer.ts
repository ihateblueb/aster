import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApNoteRenderer {
	public render(note) {
		const apNote = {
			'@context': context,

			type: 'Note',
			id: note.apId,

			actor: note.user.apId,
			attributedTo: note.user.apId,

			sensitive: Boolean(note.cw),
			summary: note.cw,
			content: note.content,
			published: note.createdAt,

			// aster:visibility
			visibility: note.visibility,
			to: [],
			cc: []
		};

		if (note.repeat) {
			apNote['quoteUrl'] = note.repeat.apId;
			apNote['quoteUri'] = note.repeat.apId;
		}

		if (note.visibility === 'public') {
			apNote.to = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (note.visibility === 'unlisted') {
			apNote.to = [note.user.followersUrl];
			apNote.cc = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (note.visibility === 'followers') {
			apNote.to = [note.user.followingUrl];
		} else if (note.visibility === 'direct') {
			apNote.to = [];
		}

		return apNote;
	}
}

export default new ApNoteRenderer();
