import { ObjectLiteral } from 'typeorm';

import NoteService from '../NoteService.js';
import RelationshipService from '../RelationshipService.js';

class UserBuilder {
	public async build(user: ObjectLiteral) {
		user['stats'] = {
			noteCount: await NoteService.count({
				user: { id: user.id }
			}),
			followingCount: (await RelationshipService.getFollowing(user.id))
				.length,
			followersCount: (await RelationshipService.getFollowers(user.id))
				.length
		};

		return user;
	}

	public async buildMany(users: ObjectLiteral[]) {
		let built: ObjectLiteral[] = [];

		for (const user of users) {
			await this.build(user).then((e) => {
				if (e) built.push(e);
			});
		}

		return built;
	}
}

export default new UserBuilder();
