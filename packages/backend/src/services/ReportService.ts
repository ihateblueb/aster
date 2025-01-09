import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';

class ReportService {
	public async get(where: where) {
		return await db
			.getRepository('report')
			.createQueryBuilder('report')
			.where(where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC',
		orWhere?: where
	) {
		return await db
			.getRepository('report')
			.createQueryBuilder('report')
			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async update(where: where, entity: Partial<ObjectLiteral>) {
		return await db.getRepository('report').update(where, entity);
	}

	public async delete(where: where) {
		return await db.getRepository('report').delete(where);
	}

	public async create(
		from?: GenericId,
		content?: string,
		user?: GenericId,
		note?: GenericId,
		apId?: ApId
	) {
		const id = IdService.generate();
		return await db.getRepository('report').insert({
			id: id,
			apId: apId ?? ConfigService.url.href + 'report/' + id,
			fromId: from,
			content: content,
			userId: user,
			noteId: note,
			createdAt: new Date().toISOString()
		});
	}
}

export default new ReportService();
