import UserService from '../UserService.js';
import ApResolver from './ApResolver.js';

class ApActorService {
	public async get(apId: string) {
		let url = new URL(apId);

		let actor = await UserService.get({ apId: apId });

		if (actor) return actor;

		// let resolvedActor = await ApResolver.resolve(apId);
		// todo: if resolved, register or update and then return as db entity

		return;
	}
}

export default new ApActorService();
