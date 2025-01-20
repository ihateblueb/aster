import { In, ObjectLiteral } from 'typeorm';

import DriveService from '../DriveService.js';

class NoteBuilder {
	public async build(note: ObjectLiteral) {
		if (note && note.attachments) {
			let attachments: ObjectLiteral[] = [];

			for (const id of note.attachments) {
				await DriveService.get({
					id: id
				}).then((e) => {
					if (e) attachments.push(e);
				});
			}

			note['attachments'] = attachments;
		}

		if (note.replyingTo)
			note.replyingTo = await this.build(note.replyingTo);
		if (note.repeat) note.repeat = await this.build(note.repeat);

		return note;
	}

	public async buildMany(notes: ObjectLiteral[]) {
		let built: ObjectLiteral[] = [];

		for (const note of notes) {
			await this.build(note).then((e) => {
				if (e) built.push(e);
			});
		}

		return built;
	}
}

export default new NoteBuilder();
