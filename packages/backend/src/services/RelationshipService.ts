import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import logger from '../utils/logger.js';
import ApAcceptRenderer from './ap/ApAcceptRenderer.js';
import ApActorService from './ap/ApActorService.js';
import ApRejectRenderer from './ap/ApRejectRenderer.js';
import IdService from './IdService.js';
import NotificationService from './NotificationService.js';
import QueueService from './QueueService.js';
import UserService from './UserService.js';

class RelationshipService {
	public async get(where: where) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')

			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')

			.where(where)
			.getOne();
	}

	public async getMany(where: where) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')

			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')

			.where(where)
			.getMany();
	}

	public async update(where: where, entity: Partial<ObjectLiteral>) {
		return await db.getRepository('relationship').update(where, entity);
	}

	public async delete(where: where) {
		return await db.getRepository('relationship').delete(where);
	}

	public async create(
		to: GenericId,
		from: GenericId,
		type: RelationshipType,
		pending: boolean,
		responseActivity?: GenericId
	) {
		return await db
			.getRepository('relationship')
			.insert({
				id: IdService.generate(),
				toId: to,
				fromId: from,
				type: type,
				pending: pending,
				responseActivityId: responseActivity,
				createdAt: new Date().toISOString()
			})
			.then(() => {
				return true;
			})
			.catch((err) => {
				console.log(err);
				logger.error('inbox', 'failed to insert relationship');
				return false;
			});
	}

	// specific get types
	public async getFollowing(from: GenericId) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where({
				from: { id: from },
				pending: false,
				type: 'follow'
			})
			.getMany();
	}

	public async getFollowers(to: GenericId) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where({
				to: { id: to },
				pending: false,
				type: 'follow'
			})
			.getMany();
	}

	public async isFollowing(to: GenericId, from: GenericId) {
		return Boolean(
			await this.get({
				to: { id: to },
				from: { id: from },
				pending: false,
				type: 'follow'
			})
		);
	}

	public async isBlocking(to: GenericId, from: GenericId) {
		return Boolean(
			await this.get({
				to: { id: to },
				from: { id: from },
				type: 'block'
			})
		);
	}

	public async acceptFollow(
		id: GenericId,
		to: GenericId,
		from: Inbox,
		body: ApObject
	) {
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

	public async rejectFollow(
		id: GenericId,
		to: GenericId,
		from: GenericId,
		body
	) {
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

	// ApRelationshipService?
	public async registerFollow(body: ApObject) {
		const to = await UserService.get({ apId: body.object });
		if (!to) return false;

		const from = await ApActorService.get(body.actor);
		if (!from) return false;

		const alreadyFollowing = await this.get({
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
					activity: JSON.stringify(body),
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

			const insertedRelationship = await this.create(
				to.id,
				from.id,
				'follow',
				true,
				aId
			)
				.then(() => {
					return true;
				})
				.catch((err) => {
					console.log(err);
					logger.error('inbox', 'failed to insert relationship');
					return false;
				});

			if (!insertedRelationship) return false;

			await NotificationService.create(
				to.id,
				from.id,
				'follow',
				undefined,
				undefined,
				id
			);

			return true;
		} else {
			const id = IdService.generate();

			await this.create(to.id, from.id, 'follow', false).catch((err) => {
				console.log(err);
				logger.error('inbox', 'failed to insert relationship');
				throw new Error('failed to insert relationship');
			});

			await NotificationService.create(
				to.id,
				from.id,
				'follow',
				undefined,
				undefined,
				id
			);

			await this.acceptFollow(id, to.id, from.inbox, body);

			return true;
		}
	}
}

export default new RelationshipService();
