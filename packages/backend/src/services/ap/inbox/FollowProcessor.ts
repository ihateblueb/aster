import RelationshipService from '../../RelationshipService.js';

class FollowProcessor {
	public async process(body): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		return await RelationshipService.registerFollow(body);
}}

export default new FollowProcessor();
