import ApNoteService from '../ApNoteService.js';

class CreateProcessor {
	public async process(body): Promise<boolean> {
		console.log(body); // todo: remove

		if (body.type !== 'Note') return false;
		await ApNoteService.register(body);

		return true;
	}
}

export default new CreateProcessor();
