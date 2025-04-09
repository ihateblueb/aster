import db from '../../utils/database.js';
import logger from '../../utils/logger.js';
import IdService from '../IdService.js';
import NotificationService from '../NotificationService.js';
import QueueService from '../QueueService.js';
import RelationshipService from '../RelationshipService.js';
import UserService from '../UserService.js';
import ApAcceptRenderer from './ApAcceptRenderer.js';
import ApActorService from './ApActorService.js';
import ApRejectRenderer from './ApRejectRenderer.js';

class ApRelationshipService {
	public async acceptFollow(to: GenericId, from: Inbox, body: ApObject) {
		const id = IdService.generate();
		const deliver = ApAcceptRenderer.render(id, to, body);

		return await QueueService.deliver
			.add(IdService.generate(), {
				as: to,
				inbox: from,
				body: deliver
			})
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}

	public async rejectFollow(to: GenericId, from: GenericId, body) {
		const id = IdService.generate();
		const deliver = ApRejectRenderer.render(id, to, body);

		return await QueueService.deliver
			.add(IdService.generate(), {
				as: to,
				inbox: from,
				body: deliver
			})
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}

	public async registerFollow(body: ApObject) {
		const to = await UserService.get({ apId: body.object });
		if (!to) return false;

		const from = await ApActorService.get(body.actor);
		if (!from) return false;

		const alreadyFollowing = await RelationshipService.get({
			to: { id: to.id },
			from: { id: from.id }
		});

		if (
			alreadyFollowing &&
			!alreadyFollowing.pending &&
			alreadyFollowing.type === 'follow'
		) {
			// accept anyway, already exists to us!
			logger.warn('follow', 'follow already exists and isnt pending');
			await this.acceptFollow(
				alreadyFollowing.id,
				to.id,
				from.inbox,
				body
			);

			return true;
		}

		if (to.locked) {
			const id = IdService.generate();
			const aId = IdService.generate();

			const insertedActivity = await db
				.getRepository('activity')
				.insert({
					id: aId,
					apId: body.id,
					content: JSON.stringify(body),
					createdAt: new Date().toISOString()
				})
				.then(() => {
					return true;
				})
				.catch((err) => {
					console.log(err);
					logger.error(
						'inbox',
						'failed to insert follow request activity'
					);
				});

			if (!insertedActivity) return false;

			const insertedRelationship = await RelationshipService.create(
				to.id,
				from.id,
				'follow',
				true,
				aId
			);

			if (!insertedRelationship) return false;

			await NotificationService.create(
				to.id,
				from.id,
				'follow',
				undefined,
				undefined,
				insertedRelationship.id
			);

			return true;
		} else {
			const insertedRelationship = await RelationshipService.create(
				to.id,
				from.id,
				'follow',
				false
			).catch((err) => {
				console.log(err);
				logger.error('inbox', 'failed to insert relationship');
				throw new Error('failed to insert relationship');
			});

			if (!insertedRelationship) return false;

			await NotificationService.create(
				to.id,
				from.id,
				'follow',
				undefined,
				undefined,
				insertedRelationship.id
			);

			await this.acceptFollow(to.id, from.inbox, body);

			return true;
		}
	}
}

export default new ApRelationshipService();
