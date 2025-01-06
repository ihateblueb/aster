import logger from '../../../utils/logger.js';
import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';

class LikeProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor || !body.object) return false;

		const actor = await ApActorService.get(body.actor);
		const note = await ApNoteService.get(body.object);

		if (!actor) throw new Error('Actor not found');
		if (!note) throw new Error('Note not found');

		if (body._misskey_content) {
			logger.warn('like', 'appears to be a react. tag:');
			console.log(body.tag);
		}

		return await NoteService.like(note.id, actor.id, false, body.id)
			.then((e) => {
				console.log(e);
				return true;
			})
			.catch((err) => {
				console.log(err);
				throw new Error('failed to like '+note.apId+' for '+actor.apId)
			});
	}
}

export default new LikeProcessor();
