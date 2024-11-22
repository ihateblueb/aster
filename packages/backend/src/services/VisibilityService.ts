import { ObjectLiteral } from 'typeorm';

import RelationshipService from './RelationshipService.js';

class VisibilityService {
	public async canISee(note: ObjectLiteral, as: string) {
		if (!note.visibility) return false;

		if (['public', 'unlisted'].includes(note.visibility)) {
			return true;
		} else if (note.visibility === 'followers') {
			return await RelationshipService.isFollowing(note.user.id, as);
		} else {
			// todo: to column or something for direct messages
			return false;
		}
	}
}

export default new VisibilityService();
