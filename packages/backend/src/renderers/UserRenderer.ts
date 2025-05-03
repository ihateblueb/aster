import { In, ObjectLiteral } from 'typeorm';

import CacheService from '../services/CacheService.js';
import EmojiService from '../services/EmojiService.js';
import NoteService from '../services/NoteService.js';
import RelationshipService from '../services/RelationshipService.js';

class UserRenderer {
	public async render(user: ObjectLiteral, skipCache?: boolean) {
		const cacheKey = 'user_render_' + user.id;
		const cached = !skipCache
			? await CacheService.get(cacheKey)
			: undefined;

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

		user['stats'] = {
			noteCount: await NoteService.count({
				user: { id: user.id }
			}),
			followingCount: (await RelationshipService.getFollowing(user.id))
				.length,
			followersCount: (await RelationshipService.getFollowers(user.id))
				.length
		};

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
