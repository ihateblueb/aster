import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import ConfigService from './ConfigService.js';
import IdService from './IdService.js';
import NotificationService from './NotificationService.js';
import SanitizerService from './SanitizerService.js';
import UserService from './UserService.js';

class ReportService {
	public async get(where: where) {
		return await db
			.getRepository('report')
			.createQueryBuilder('report')

			.leftJoinAndSelect('report.from', 'from')
			.leftJoinAndSelect('report.user', 'user')
			.leftJoinAndSelect('report.note', 'note')

			.where(where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		orderDirection?: 'ASC' | 'DESC',
		orWhere?: where,
		andWhere?: where
	) {
		return await db
			.getRepository('report')
			.createQueryBuilder('report')

			.leftJoinAndSelect('report.from', 'from')
			.leftJoinAndSelect('report.user', 'user')
			.leftJoinAndSelect('report.note', 'note')

			.where(where)
			.orWhere(orWhere ?? where)
			.andWhere(andWhere ?? where)
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

		await db.getRepository('report').insert({
			id: id,
			apId: apId ?? ConfigService.url.href + 'report/' + id,
			fromId: from,
			content: SanitizerService.sanitize(content),
			userId: user,
			noteId: note,
			createdAt: new Date().toISOString()
		});

		const admins = await UserService.getMany({ admin: true });
		const instanceActor = await UserService.get({
			username: 'instanceactor'
		});

		for (const admin of admins) {
			await NotificationService.create(
				admin.id,
				instanceActor.id,
				'report',
				undefined,
				undefined,
				undefined,
				id
			);
		}
	}
}

export default new ReportService();
