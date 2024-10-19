import UserService from '../UserService.js';
import ApResolver from './ApResolver.js';
import ApValidationService from './ApValidationService.js';

class ApActorService {
	public async get(apId: string) {
		let url = new URL(apId);

		let actor = await UserService.get({ apId: apId });
		if (actor) return actor;

		let resolvedActor = await ApResolver.resolveSigned(apId);

		if (!resolvedActor) return false;
		return await this.register(await resolvedActor.json());
	}

	public async register(body) {
		if (!ApValidationService.validBody(body)) return false;

		console.log(body);

		return;
	}
}

export default new ApActorService();
