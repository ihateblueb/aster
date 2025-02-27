import { ObjectLiteral } from 'typeorm';

import NoteBuilder from './NoteRenderer.js';
import NoteService from './NoteService.js';
import VisibilityService from './VisibilityService.js';

class ContextRenderer {
	public async build(note: GenericId, depth: number, as?: GenericId) {
		let replies: ObjectLiteral[] = [];

		if (depth >= 5) return;
		depth++;

		let notes = await NoteService.getMany({
			replyingTo: { id: note }
		});

		for (const reply of notes) {
			if (
				(reply.visibility === 'followers' ||
					reply.visibility === 'direct') &&
				!(await VisibilityService.canISee(reply, as))
			)
				continue;

			reply.replies = await this.build(reply.id, depth);
			replies.push(await NoteBuilder.build(reply));
		}

		return replies;
	}
}

export default new ContextRenderer();
