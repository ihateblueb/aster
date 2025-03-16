import { In, ObjectLiteral } from 'typeorm';

import DriveService from './DriveService.js';
import EmojiService from './EmojiService.js';
import UserRenderer from './UserRenderer.js';

class NoteRenderer {
	public async render(note: ObjectLiteral) {
		if (note.user) note.user = await UserRenderer.render(note.user);

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
				console.log(reaction);

				if (reactions.some((e) => e.emoji?.id === reaction.emoji?.id)) {
					reactions[
						reactions.findIndex(
							(e) => e.emoji?.id === reaction.emoji?.id
						)
					].users.push(reaction.user);
				} else if (
					reactions.some(
						(e) =>
							e.content === reaction.content &&
							reaction.emoji === undefined
					)
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
			note.replyingTo = await this.render(note.replyingTo);

		if (note.repeat) note.repeat = await this.render(note.repeat);

		return note;
	}

	public async renderMany(notes: ObjectLiteral[]) {
		let rendered: ObjectLiteral[] = [];

		for (const note of notes) {
			await this.render(note).then((e) => {
				if (e) rendered.push(e);
			});
		}

		return rendered;
	}
}

export default new NoteRenderer();
