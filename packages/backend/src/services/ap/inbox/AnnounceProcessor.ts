import logger from '../../../utils/logger.js';
import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';
import ApVisibilityService from '../ApVisibilityService.js';

class AnnounceProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.object) return false;
		if (!body.actor) return false;

		const actor = await ApActorService.get(body.actor);
		if (!actor) throw new Error('Actor not found');

		let note;
		if (body.object.id) {
			note = await ApNoteService.get(body.object.id);
		} else {
			note = await ApNoteService.get(body.object);
		}
		if (!note) return false;

		const visibility = (await ApVisibilityService.determine(body))
			.visibility;

		logger.debug(
			'announce',
			'by ' + actor.apId + ' targeting ' + note.id + ' vis ' + visibility
		);

		return await NoteService.repeat(
			note.id,
			actor.id,
			false,
			visibility,
			body.id
		)
			.then((e) => {
				console.log(e);
				if (e.error) return false;
				return true;
			})
			.catch((err) => {
				console.log(err);
				throw new Error(
					'failed to repeat ' + note.apId + ' for ' + actor.apId
				);
			});
	}
}

export default new AnnounceProcessor();
