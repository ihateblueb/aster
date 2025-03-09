import { In, ObjectLiteral } from 'typeorm';

import EmojiService from './EmojiService.js';

class UserRenderer {
	public async render(user: ObjectLiteral) {
		// TODO: cache
		if (user && user.emojis) {
			let emojis: ObjectLiteral[] = [];

			await EmojiService.getMany({
				id: In(user.emojis)
			}).then((e) => {
				if (e)
					for (const f of e) {
						emojis.push(f);
					}
			});

			user['emojis'] = emojis;
		}

		/* adds ~200ms
		* user['stats'] = {
			noteCount: await NoteService.count({
				user: { id: user.id }
			}),
			followingCount: (await RelationshipService.getFollowing(user.id))
				.length,
			followersCount: (await RelationshipService.getFollowers(user.id))
				.length
		};
		* */

		return user;
	}

	public async renderMany(users: ObjectLiteral[]) {
		let rendered: ObjectLiteral[] = [];

		for (const user of users) {
			await this.render(user).then((e) => {
				if (e) rendered.push(e);
			});
		}

		return rendered;
	}
}

export default new UserRenderer();
