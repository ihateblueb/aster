import RelationshipService from '../../RelationshipService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class RejectProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object && !body.object.type) return false;

		if (body.object.type === 'Follow') {
			if (!body.object.actor || !body.object.object) return false;

			const to = await ApActorService.get(body.actor);
			const from = await UserService.get({ apId: body.object.actor });

			if (!to) throw new Error('Actor not found');

			return await RelationshipService.delete({
				to: { id: to.id },
				from: { id: from.id }
			}).then(() => {
				return true;
			});
		}
	}
}

export default new RejectProcessor();
