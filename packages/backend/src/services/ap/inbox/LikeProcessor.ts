import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';

class LikeProcessor {
	public async process(body): Promise<boolean> {
		if (!body.actor || !body.object) return false;

		let actor = await ApActorService.get(body.actor);
		let note = await ApNoteService.get(body.object);

		if (!actor) return false;
		if (!note) return false;

		return await NoteService.like(note.id, actor.id, false)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}
}

export default new LikeProcessor();
