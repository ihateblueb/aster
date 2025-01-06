// https://dev.aster.pages.gay/queue/queue/%7Binbox%7D/1477
// https://dev.aster.pages.gay/queue/queue/%7Binbox%7D/1478

import logger from '../../../utils/logger.js';
import UserService from '../../UserService.js';
import ApActorService from '../ApActorService.js';

class UpdateProcessor {
	public async updateActor(body: ApObject) {
		let user = await ApActorService.update(body);

		if (user) return true;
		return false;
	}

	public async process(body: ApObject): Promise<boolean> {
		if (!body.object.type) return false;
		if (!body.actor) return false;

		const actor = await UserService.get({ apId: body.actor });

		if (
			body.object.type === 'Person' ||
			body.object.type === 'Service' ||
			body.object.type === 'Application'
		) {
			if (!body.object.id) return false;

			const object = await UserService.get({ apId: body.object.id });

			if (!object) return false;
			// any actor from an instance is assumed to have permission to modify other actors from their instance
			if (actor.host === object.host)
				return await this.updateActor(body.object);
		} else {
			logger.warn(
				'update',
				'unprocessed update object type ' + body.object.type
			);
		}

		return false;
	}
}

export default new UpdateProcessor();
