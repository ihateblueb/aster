import * as uuid from 'uuid';

import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';
import QueueService from '../../QueueService.js';
import UserService from '../../UserService.js';
import ApAcceptRenderer from '../ApAcceptRenderer.js';
import ApActorService from '../ApActorService.js';
import ApDeliverService from '../ApDeliverService.js';

class FollowProcessor {
	public async process(body): Promise<boolean> {
		if (!body.actor) return false;
		if (!body.object) return false;

		let to = await UserService.get({ apId: body.object });
		if (!to) return false;

		let from = await ApActorService.get(body.actor);
		if (!from) return false;

		if (to.locked) {
			const id = uuid.v7();
			const aId = uuid.v7();

			// todo: does this need a space in the relationship service?
			await db
				.getRepository('activity')
				.insert({
					id: aId,
					activity: JSON.stringify(body)
				})
				.catch((err) => {
					console.log(err);
					logger.error(
						'inbox',
						'failed to insert follow request activity'
					);
					throw new Error('failed to insert follow request activity');
				});

			await db
				.getRepository('relationship')
				.insert({
					id: id,
					to: to.id,
					from: from.id,
					type: 'follow',
					pending: true,
					responseActivityId: aId,
					createdAt: new Date().toISOString()
				})
				.catch((err) => {
					console.log(err);
					logger.error('inbox', 'failed to insert relationship');
					throw new Error('failed to insert relationship');
				});

			return true;
		} else {
			const id = uuid.v7();

			await db
				.getRepository('relationship')
				.insert({
					id: id,
					to: to.id,
					from: from.id,
					type: 'follow',
					pending: false,
					createdAt: new Date().toISOString()
				})
				.catch((err) => {
					console.log(err);
					logger.error('inbox', 'failed to insert relationship');
					throw new Error('failed to insert relationship');
				});

			await QueueService.deliver.add('deliver', {
				as: to.id,
				inbox: from.inbox,
				body: ApAcceptRenderer.render({
					id: id,
					activity: body
				})
			});

			return true;
		}

		return false;
	}
}

export default new FollowProcessor();
