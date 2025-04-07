import UserService from '../../UserService.js';
import ApRelationshipService from '../ApRelationshipService.js';

class FollowProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		const object = await UserService.get({ apId: body.object });
		if (!object) return false;
		if (!object.local) return false;

		return await ApRelationshipService.registerFollow(body);
	}
}

export default new FollowProcessor();
