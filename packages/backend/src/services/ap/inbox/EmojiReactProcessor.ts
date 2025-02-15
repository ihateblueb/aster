import ReactionService from '../../ReactionService.js';
import ApActorService from '../ApActorService.js';
import ApEmojiService from '../ApEmojiService.js';
import ApNoteService from '../ApNoteService.js';

class EmojiReactProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor || !body.object || !body.content) return false;

		const actor = await ApActorService.get(body.actor);
		const note = await ApNoteService.get(body.object);

		if (!actor) throw new Error('Actor ' + body.actor + ' not found');
		if (!note) return false;

		if (
			body.tag &&
			body.tag.find((e) => e.name === body.content.replaceAll(':', ''))
		) {
			const emojiTag = body.tag.find(
				(e) => e.name === body.content.replaceAll(':', '')
			);

			let emoji;
			const existingEmoji = await ApEmojiService.get(emojiTag.id);
			if (existingEmoji) emoji = existingEmoji;
			if (!existingEmoji) emoji = await ApEmojiService.register(emojiTag);

			// custom emoji!
			return await ReactionService.create(
				note.id,
				emoji.id,
				undefined,
				actor.id,
				false,
				body.id
			)
				.then((e) => {
					console.log(e);
					return true;
				})
				.catch((err) => {
					console.log(err);
					throw new Error(
						'failed to react ' + note.apId + ' for ' + actor.apId
					);
				});
		} else {
			return await ReactionService.create(
				note.id,
				undefined,
				body.content,
				actor.id,
				false,
				body.id
			)
				.then((e) => {
					console.log(e);
					return true;
				})
				.catch((err) => {
					console.log(err);
					throw new Error(
						'failed to react ' + note.apId + ' for ' + actor.apId
					);
				});
		}
	}
}

export default new EmojiReactProcessor();
