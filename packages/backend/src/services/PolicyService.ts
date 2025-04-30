import { ObjectLiteral } from 'typeorm';

import db from '../utils/database';

type PolicyType =
	| 'BlockHost'
	| 'RejectContent'
	| 'RejectMedia'
	| 'RejectEmoji'
	| 'ForceCw'
	| 'ForceSensitive';

/*
    BlockHost: Reject all activities by host, do not send activities to host
    RejectContent: Reject note content by regex filter
    RejectMedia: Reject media by host
    RejectEmoji: Reject emoji by regex filter
    ForceCw: Force content warning by host
    ForceSensitive: Force users and media to be marked sensitive

    todo: go back over with Force*? seperate service for mass update queries? 
*/

class PolicyService {
	public async get(where: where) {
		return await db
			.getRepository('policy')
			.createQueryBuilder('policy')
			.where(where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC'
	) {
		return await db
			.getRepository('policy')
			.createQueryBuilder('policy')
			.where(where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async delete(where: where) {
		return await db
			.getRepository('policy')
			.createQueryBuilder('policy')
			.where(where)
			.delete();
	}

	public async update(where: where, partial: ObjectLiteral) {
		// todo: is this update correct? update others if so, prefer to use all query builder over other method
		return await db
			.getRepository('policy')
			.createQueryBuilder('policy')
			.where(where)
			.update(partial);
	}

	// if no host, apply to all
	public async create(
		type: PolicyType,
		filter?: string,
		host?: string,
		cw?: string
	) {
		// todo: PolicyService.create()
	}
}

export default new PolicyService();
