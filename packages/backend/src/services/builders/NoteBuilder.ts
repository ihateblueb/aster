import { In, ObjectLiteral } from 'typeorm';

import DriveService from '../DriveService.js';
import EmojiService from '../EmojiService.js';
import UserBuilder from './UserBuilder.js';

class NoteBuilder {
	public async build(note: ObjectLiteral) {
		if (note.user) note.user = await UserBuilder.build(note.user);

		if (note && note.attachments) {
			let attachments: ObjectLiteral[] = [];

			await DriveService.getMany({
				id: In(note.attachments)
			}).then((e) => {
				if (e)
					for (const f of e) {
						attachments.push(f);
					}
			});

			note['attachments'] = attachments;
		}

		if (note && note.emojis) {
			let emojis: ObjectLiteral[] = [];

			await EmojiService.getMany({
				id: In(note.emojis)
			}).then((e) => {
				if (e)
					for (const f of e) {
						emojis.push(f);
					}
			});

			note['emojis'] = emojis;
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
