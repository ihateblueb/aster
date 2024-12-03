import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';
import ApVisibilityService from '../ApVisibilityService.js';

class AnnounceProcessor {
	public async process(body): Promise<boolean> {
		if (!body.object) return false;
		if (!body.actor) return false;

		let actor = await ApActorService.get(body.actor);
		let note = await ApNoteService.get(body.object);
		let visibility = await ApVisibilityService.determine(body);

		if (!actor) return false;
		if (!note) return false;

		return await NoteService.repeat(note.id, actor.id, false, visibility)
			.then((e) => {
				return e.error;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	}
}

export default new AnnounceProcessor();
