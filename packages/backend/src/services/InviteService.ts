import crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';

import InviteRenderer from '../renderers/InviteRenderer.js';
import db from '../utils/database.js';
import IdService from './IdService.js';
import UserService from './UserService.js';

class InviteService {
	public createQueryBuilder() {
		return db
			.getRepository('invite')
			.createQueryBuilder('invite')
			.leftJoinAndSelect('invite.creator', 'creator')
			.leftJoinAndSelect('invite.user', 'user');
	}

	public async get(where: where) {
		return await this.createQueryBuilder().where(where).getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		direction?: 'ASC' | 'DESC'
	) {
		return await this.createQueryBuilder()
			.where(where)
			.take(take)
			.orderBy(order, direction)
			.getMany();
	}

	public async update(where: where, partial: Partial<ObjectLiteral>) {
		return await db.getRepository('invite').update(where, partial);
	}

	public async delete(where: where) {
		return await db.getRepository('invite').delete(where);
	}

	public async create(as: string) {
		const invite = crypto.randomBytes(16).toString('hex');
		const user = await UserService.get({ id: as });

		if (!user)
			return {
				error: true,
				status: 404,
				message: 'User not found'
			};

		const id = IdService.generate();

		await db.getRepository('invite').insert({
			id: id,
			creatorId: as,
			createdAt: new Date(Date.now()).toISOString(),
			invite: invite
		});

		return {
			error: false,
			status: 200,
			invite: await InviteRenderer.render(await this.get({ id: id }))
		};
	}

	public async use(invite: string, as: GenericId) {
		const grabbedInvite = await db.getRepository('invite').findOne({
			where: {
				invite: invite
			}
		});

		if (!grabbedInvite)
			return {
				error: true,
				status: 404,
				message: 'Invite not found'
			};

		if (grabbedInvite.user)
			return {
				error: true,
				status: 400,
				message: 'Invite already used'
			};

		await this.update(
			{
				invite: invite
			},
			{
				userId: as
			}
		);

		return {
			error: false,
			status: 200,
			message: 'Invite used'
		};
	}
}

export default new InviteService();
