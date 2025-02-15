import { In, ObjectLiteral } from 'typeorm';

import DriveService from './DriveService.js';
import EmojiService from './EmojiService.js';
import UserRenderer from './UserRenderer.js';

class NoteRenderer {
	public async build(note: ObjectLiteral) {
		if (note.user) note.user = await UserRenderer.build(note.user);

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

		if (note && note.reactions) {
			let reactions: ObjectLiteral[] = [];

			for (const reaction of note.reactions) {
				if (reactions.some((e) => e.emoji?.id === reaction.emoji?.id)) {
					reactions[
						reactions.findIndex(
							(e) => e.emoji.id === reaction.emoji.id
						)
					].users.push(reaction.user);
				} else if (
					reactions.some((e) => e.content === reaction.content)
				) {
					reactions[
						reactions.findIndex(
							(e) => e.content === reaction.content
						)
					].users.push(reaction.user);
				} else {
					reactions.push({
						emoji: reaction.emoji,
						content: reaction.content,
						users: [reaction.user]
					});
				}
			}

			note['reactions'] = reactions;
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

export default new NoteRenderer();
