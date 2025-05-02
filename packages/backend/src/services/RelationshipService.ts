import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import logger from '../utils/logger.js';
import ApRelationshipService from './ap/ApRelationshipService.js';
import IdService from './IdService.js';

class RelationshipService {
	public async get(where: where) {
		let queryBuilder = db
			.getRepository('relationship')
			.createQueryBuilder('relationship');

		queryBuilder
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where(where);

		return await queryBuilder.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		direction?: 'ASC' | 'DESC'
	) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')

			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')

			.where(where)
			.take(take)
			.orderBy(order, direction)
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
		responseActivity?: ApId
	) {
		const id = IdService.generate();
		return await db
			.getRepository('relationship')
			.insert({
				id: id,
				toId: to,
				fromId: from,
				type: type,
				pending: pending,
				activityForResponseId: responseActivity,
				createdAt: new Date().toISOString()
			})
			.then(() => {
				return this.get({ id: id });
			})
			.catch((err) => {
				console.log(err);
				logger.error('relationship', 'failed to insert relationship');
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

	public async getMuting(from: GenericId) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where({
				from: { id: from },
				type: 'mute'
			})
			.getMany();
	}

	public async getBlocking(from: GenericId) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.leftJoinAndSelect('relationship.to', 'to')
			.leftJoinAndSelect('relationship.from', 'from')
			.where({
				from: { id: from },
				type: 'block'
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

	public async eitherBlocking(to: GenericId, from: GenericId) {
		if (
			(await this.isBlocking(to, from)) ||
			(await this.isBlocking(from, to))
		) {
			logger.debug(
				'relationship',
				'eitherBlocking ' + to + ' ' + from + ' true'
			);
			return true;
		}
		return false;
	}

	public async acceptFollow(id: GenericId) {
		const relationship = await this.get({ id: id });

		if (!relationship)
			return {
				error: true,
				status: 404,
				message: 'Not found'
			};

		if (!relationship.pending)
			return {
				error: true,
				status: 400,
				message: 'Relationship not pending'
			};

		await ApRelationshipService.acceptFollow(
			relationship.to.id,
			relationship.from.inbox,
			relationship.activityForResponseId
		);

		await this.update(
			{
				id: id
			},
			{
				pending: false
			}
		);

		return {
			error: false,
			status: 200,
			message: 'Accepted follow request'
		};
	}

	public async rejectFollow(id: GenericId) {
		const relationship = await this.get({ id: id });

		if (!relationship)
			return {
				error: true,
				status: 404,
				message: 'Not found'
			};

		if (!relationship.pending)
			return {
				error: true,
				status: 400,
				message: 'Relationship not pending'
			};

		await ApRelationshipService.rejectFollow(
			relationship.to.id,
			relationship.from.inbox,
			relationship.activityForResponseId
		);

		await this.delete({
			id: id
		});

		return {
			error: false,
			status: 200,
			message: 'Rejected follow request'
		};
	}
}

export default new RelationshipService();
