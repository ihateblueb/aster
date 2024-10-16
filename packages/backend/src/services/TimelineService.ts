import { In } from 'typeorm';

import NoteService from './NoteService.js';

class TimelineService {
	public async get() {
		console.log(
			await NoteService.getMany({
				'user.local': Boolean(true), // todo: does this fix the undefined problem?
				visibility: In(['public'])
			})
		);

		return;
	}
}

export default new TimelineService();
