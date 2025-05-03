import ApAcceptRenderer from '../../renderers/ap/ApAcceptRenderer.js';
import ApRejectRenderer from '../../renderers/ap/ApRejectRenderer.js';
import logger from '../../utils/logger.js';
import CacheService from '../CacheService.js';
import IdService from '../IdService.js';
import NotificationService from '../NotificationService.js';
import QueueService from '../QueueService.js';
import RelationshipService from '../RelationshipService.js';
import UserService from '../UserService.js';
import ApActorService from './ApActorService.js';

class ApRelationshipService {
	public async acceptFollow(
		to: GenericId,
		from: Inbox,
		apId: ApObject | ApId
	) {
		const id = IdService.generate();
		const deliver = ApAcceptRenderer.render(id, to, apId);

		await CacheService.scanAndDel('user*' + to);

		const fromUser = await UserService.get({ from: from });
		if (fromUser) await ApActorService.refetch(fromUser?.apId);

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

	public async rejectFollow(to: GenericId, from: GenericId, apId: ApId) {
		const id = IdService.generate();
		const deliver = ApRejectRenderer.render(id, to, apId);

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
			await this.acceptFollow(to.id, from.inbox, body);

			return true;
		}

		if (to.locked) {
			console.log(body.id);

			const insertedRelationship = await RelationshipService.create(
				to.id,
				from.id,
				'follow',
				true,
				body.id
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

			await this.acceptFollow(to.id, from.inbox, body.id);

			return true;
		}
	}
}

export default new ApRelationshipService();
