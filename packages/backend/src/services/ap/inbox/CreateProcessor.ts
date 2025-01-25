import NoteService from '../../NoteService.js';
import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';

class CreateProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (body.object.type === 'Note') {
			const existingNote = await NoteService.get({
				apId: body.object.id
			});
			if (existingNote) return true;

			await ApNoteService.register(body.object);
			return true;
		} else if (
			['Person', 'Service', 'Application'].includes(body.object.type)
		) {
			await ApActorService.register(body.object);
			return true;
		} else {
			return false;
		}
	}
}

export default new CreateProcessor();
