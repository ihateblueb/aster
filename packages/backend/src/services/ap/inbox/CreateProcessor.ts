import ApActorService from '../ApActorService.js';
import ApNoteService from '../ApNoteService.js';

class CreateProcessor {
	public async process(body): Promise<boolean> {
		console.log(body); // todo: remove

		if (body.object.type === 'Note') {
			await ApNoteService.register(body.object);
			return true;
		} else if (
			body.object.type === 'Person' ||
			body.object.type === 'Service'
		) {
			await ApActorService.register(body.object);
			return true;
		} else {
			return false;
		}
	}
}

export default new CreateProcessor();
