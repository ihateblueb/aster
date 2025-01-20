import { In, ObjectLiteral } from 'typeorm';

import DriveService from '../DriveService.js';

class NoteBuilder {
	public async build(note: ObjectLiteral) {
		if (note && note.attachments) {
			let attachments: ObjectLiteral[] = [];

			let fileIds: string[] = [];
			for (const id of note.attachments) {
				fileIds.push(id);
			}

			await DriveService.get({
				id: In(fileIds)
			}).then((e) => {
				attachments.push(e);
			});

			note['attachments'] = attachments;
		}

		return note;
	}

	public async buildMany(notes: ObjectLiteral[]) {
		let built: ObjectLiteral[] = [];

		for (const note of notes) {
			await this.build(note).then((e) => {
				built.push(e);
			});
		}

		return built;
	}
}

export default new NoteBuilder();
