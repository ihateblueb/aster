import LikeService from '../../LikeService.js';
import ReactionService from '../../ReactionService.js';
import ApActorService from '../ApActorService.js';
import ApEmojiService from '../ApEmojiService.js';
import ApNoteService from '../ApNoteService.js';

class LikeProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor || !body.object) return false;

		const actor = await ApActorService.get(body.actor);
		const note = await ApNoteService.get(body.object);

		if (!actor) throw new Error('Actor ' + body.actor + ' not found');
		if (!note) return false;

		const content = body.content ?? body._misskey_content;
		if (content) {
			if (
				body.tag &&
				body.tag.find((e) => e.name === content.replaceAll(':', ''))
			) {
				const emojiTag = body.tag.find(
					(e) => e.name === content.replaceAll(':', '')
				);

				let emoji;
				const existingEmoji = await ApEmojiService.get(emojiTag.id);
				if (existingEmoji) emoji = existingEmoji;
				if (!existingEmoji)
					emoji = await ApEmojiService.register(emojiTag);

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
							'failed to react ' +
								note.apId +
								' for ' +
								actor.apId
						);
					});
			} else {
				return await ReactionService.create(
					note.id,
					undefined,
					content,
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
							'failed to react ' +
								note.apId +
								' for ' +
								actor.apId
						);
					});
			}
		}

		return await LikeService.create(note.id, actor.id, false, body.id)
			.then((e) => {
				console.log(e);
				return true;
			})
			.catch((err) => {
				console.log(err);
				throw new Error(
					'failed to like ' + note.apId + ' for ' + actor.apId
				);
			});
	}
}

export default new LikeProcessor();
