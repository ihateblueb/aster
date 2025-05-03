import { In, ObjectLiteral } from 'typeorm';

import DriveService from '../services/DriveService.js';
import EmojiService from '../services/EmojiService.js';
import UserRenderer from './UserRenderer.js';

class NoteRenderer {
	public async render(note: ObjectLiteral, skipCache?: boolean) {
		/*
		const cacheKey = 'note_render_' + note.id;
		const cached = !skipCache
			? await CacheService.get(cacheKey)
			: undefined;

		if (cached && !skipCache) return JSON.parse(cached);*/

		if (note.user) note.user = await UserRenderer.render(note.user);

		if (note.likes) {
			for (const like of note.likes) {
				if (like.user)
					like['user'] = await UserRenderer.render(like.user);
			}
		}

		if (note.repeats) {
			for (const repeat of note.repeats) {
				if (repeat.user)
					repeat['user'] = await UserRenderer.render(repeat.user);
			}
		}

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

			for (const reaction of reactions) {
				if (reaction.users && reaction.users.length > 0) {
					reaction.users = UserRenderer.renderMany(reaction.users);
				}
			}
		}

		if (note.replyingTo)
			note.replyingTo = await this.render(note.replyingTo);

		if (note.repeat) note.repeat = await this.render(note.repeat);

		/*
		if (!cached && !skipCache)
			await CacheService.set(cacheKey, JSON.stringify(note));
			*/

		return note;
	}

	public async renderMany(notes: ObjectLiteral[], skipCache?: boolean) {
		let rendered: ObjectLiteral[] = [];

		for (const note of notes) {
			await this.render(note, skipCache).then((e) => {
				if (e) rendered.push(e);
			});
		}

		return rendered;
	}
}

export default new NoteRenderer();
