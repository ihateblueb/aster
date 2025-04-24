import { In, ObjectLiteral } from 'typeorm';

import CacheService from './CacheService.js';
import EmojiService from './EmojiService.js';

class UserRenderer {
	public async render(user: ObjectLiteral, skipCache?: boolean) {
		// todo: test
		const cacheKey = 'user_render_' + user.id;
		const cached = await CacheService.get(cacheKey);

		if (cached && !skipCache) return JSON.parse(cached);

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

		if (!cached && !skipCache)
			await CacheService.set(cacheKey, JSON.stringify(user));

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
