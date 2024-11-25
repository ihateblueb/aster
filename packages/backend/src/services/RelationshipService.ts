import * as uuid from 'uuid';

import db from '../utils/database.js';
import logger from '../utils/logger.js';
import ApAcceptRenderer from './ap/ApAcceptRenderer.js';
import ApActorService from './ap/ApActorService.js';
import ApRejectRenderer from './ap/ApRejectRenderer.js';
import QueueService from './QueueService.js';
import UserService from './UserService.js';

class RelationshipService {
	public async get(to: string, from: string) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where({
				to: { id: to },
				from: { id: from }
			})
			.getOne();
	}

	public async getFollowing(from: string) {
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

	public async getFollowers(to: string) {
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

	public async isFollowing(to: string, from: string) {
		return Boolean(
			await db
				.getRepository('relationship')
				.createQueryBuilder('relationship')
				.leftJoinAndSelect('relationship.to', 'to')
				.leftJoinAndSelect('relationship.from', 'from')
				.where({
					to: { id: to },
					from: { id: from },
					pending: false,
					type: 'follow'
				})

				.getOne()
		);
	}

	public async acceptFollow(id: string, to: string, from: string, body) {
		let deliver = ApAcceptRenderer.render(id, to, body);

		return await QueueService.deliver
			.add('{deliver}', {
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

	public async rejectFollow(id: string, to: string, from: string, body) {
		let deliver = ApRejectRenderer.render(id, to, body);

		return await QueueService.deliver
			.add('{deliver}', {
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

	public async registerFollow(body) {
		let to = await UserService.get({ apId: body.object });
		if (!to) return false;

		let from = await ApActorService.get(body.actor);
		if (!from) return false;

		let alreadyFollowing = await this.get(to.id, from.id);

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
			const id = uuid.v7();
			const aId = uuid.v7();

			let insertedActivity = await db
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

			let insertedRelationship = await db
				.getRepository('relationship')
				.insert({
					id: id,
					toId: to.id,
					fromId: from.id,
					type: 'follow',
					pending: true,
					responseActivityId: aId,
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

			if (!insertedRelationship) return false;

			return true;
		} else {
			const id = uuid.v7();

			await db
				.getRepository('relationship')
				.insert({
					id: id,
					toId: to.id,
					fromId: from.id,
					type: 'follow',
					pending: false,
					createdAt: new Date().toISOString()
				})
				.catch((err) => {
					console.log(err);
					logger.error('inbox', 'failed to insert relationship');
					throw new Error('failed to insert relationship');
				});

			await this.acceptFollow(id, to.id, from.inbox, body);

			return true;
		}
	}
}

export default new RelationshipService();
