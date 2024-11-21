import ApNoteService from '../ApNoteService.js';

class CreateProcessor {
	public async process(body): Promise<boolean> {
		console.log(body); // todo: remove

		if (body.object.type !== 'Note') return false;
		await ApNoteService.register(body.object);

		return true;
	}
}

export default new CreateProcessor();
