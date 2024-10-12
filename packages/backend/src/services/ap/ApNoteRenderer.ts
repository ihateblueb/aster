import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApNoteRenderer {
	public render(note) {
		let apNote = {
			'@context': context,

			type: 'Note',

			id: note.apId
		};

		return apNote;
	}
}

export default new ApNoteRenderer();
