import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';

class CreateProcessor {
	public async process(body): Promise<boolean> {
		if (body.object.type === 'Note') {
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
