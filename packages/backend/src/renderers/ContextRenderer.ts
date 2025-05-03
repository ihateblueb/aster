import { ObjectLiteral } from 'typeorm';

import NoteService from '../services/NoteService.js';
import VisibilityService from '../services/VisibilityService.js';
import NoteRenderer from './NoteRenderer.js';

class ContextRenderer {
	public async render(note: GenericId, depth: number, as?: GenericId) {
		let replies: ObjectLiteral[] = [];

		if (depth >= 5) return;
		depth++;

		let notes = await NoteService.getMany({
			replyingTo: { id: note }
		});

		for (const reply of notes) {
			if (!(await VisibilityService.canISee(reply, as))) continue;

			reply.replies = await this.render(reply.id, depth);
			replies.push(await NoteRenderer.render(reply));
		}

		return replies;
	}
}

export default new ContextRenderer();
