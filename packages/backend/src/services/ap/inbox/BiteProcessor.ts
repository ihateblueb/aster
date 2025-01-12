import NotificationService from '../../NotificationService.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class BiteProcessor {
	public async process(body: ApObject): Promise<boolean> {
		if (!body.target) return false;

		const actor = await ApActorService.get(body.actor);
		if (!actor) throw new Error('Actor not found');

		const user = await UserService.get({ apId: body.target });
		if (!user) return false;

		return await NotificationService.create(user.id, actor.id, 'bite').then(
			() => {
				return true;
			}
		);
	}
}

export default new BiteProcessor();
