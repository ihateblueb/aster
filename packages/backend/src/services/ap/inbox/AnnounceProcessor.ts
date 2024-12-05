import logger from '../../../utils/logger.js';
import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';
import ApVisibilityService from '../ApVisibilityService.js';

class AnnounceProcessor {
	public async process(body): Promise<boolean> {
		if (!body.object) return false;
		if (!body.actor) return false;

		const actor = await ApActorService.get(body.actor);
		const note = await ApNoteService.get(body.object);
		const visibility = await ApVisibilityService.determine(body);

		if (!actor) return false;
		if (!note) return false;

		logger.debug(
			'announce',
			'by ' + actor.apId + ' targeting ' + note.id + ' vis ' + visibility
		);

		return await NoteService.repeat(note.id, actor.id, false, visibility)
			.then(() => {
				return true;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	}
}

export default new AnnounceProcessor();
