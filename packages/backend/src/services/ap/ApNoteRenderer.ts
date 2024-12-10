import context from '../../static/context.js';
import config from '../../utils/config.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApNoteRenderer {
	public async render(note) {
		const apNote = {
			'@context': context,

			type: 'Note',
			id: note.apId,

			actor: note.user.apId,
			attributedTo: note.user.apId,

			sensitive: Boolean(note.cw),

			summary: note.cw,
			_misskey_summary: note.cw,
			content: note.content,
			_misskey_content: note.content,

			published: note.createdAt,

			visibility: note.visibility,
			to: [],
			cc: []
		};

		if (note.replyingTo) {
			apNote['inReplyTo'] = note.replyingTo.apId;
		}

		if (note.repeat) {
			apNote['quoteUrl'] = note.repeat.apId;
			apNote['quoteUri'] = note.repeat.apId;
			apNote['_misskey_quote'] = note.repeat.apId;
		}

		let visibility = await ApVisibilityService.render(note.user, note)

		apNote.to = visibility.to;
		apNote.cc = visibility.cc;

		return apNote;
	}
}

export default new ApNoteRenderer();
