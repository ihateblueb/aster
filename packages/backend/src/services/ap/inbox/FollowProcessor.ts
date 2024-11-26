import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';

class FollowProcessor {
	public async process(body): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		let object = await UserService.get({ apId: body.object });
		if (!object) return false;
		if (!object.local) return false;

		return await RelationshipService.registerFollow(body);
	}
}

export default new FollowProcessor();
