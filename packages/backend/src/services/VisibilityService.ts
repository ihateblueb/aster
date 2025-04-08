import { ObjectLiteral } from 'typeorm';

import RelationshipService from './RelationshipService.js';

class VisibilityService {
	public async canISee(note: ObjectLiteral, as?: string) {
		if (!note || !note.visibility) return false;

		if (['public', 'unlisted'].includes(note.visibility)) return true;

		if (as) {
			if (!(await RelationshipService.eitherBlocking(note.user.id, as)))
				return false;

			if (note.replyingTo) {
				if (
					!(await RelationshipService.eitherBlocking(
						note.replyingTo.user.id,
						as
					))
				)
					return false;
			}

			if (note.repeat) {
				if (
					!(await RelationshipService.eitherBlocking(
						note.user.id,
						as
					))
				)
					return false;
			}

			if (note.to && note.to.includes(as)) return true;
			if (note.visibility === 'followers')
				return as
					? await RelationshipService.isFollowing(note.user.id, as)
					: false;
		}

		return false;
	}
}

export default new VisibilityService();
