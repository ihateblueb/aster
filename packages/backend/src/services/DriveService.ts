import { ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import IdService from './IdService.js';

class DriveService {
	public async get(where: where, orWhere?: where) {
		return await db
			.getRepository('drive_file')
			.createQueryBuilder('drive_file')
			.where(where)
			.orWhere(orWhere ?? where)
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
			.getRepository('drive_file')
			.createQueryBuilder('drive_file')
			.where(where)
			.orWhere(orWhere ?? where)
			.andWhere(andWhere ?? where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}

	public async update(where: where, entity: Partial<ObjectLiteral>) {
		return await db.getRepository('drive_file').update(where, entity);
	}

	public async delete(where: where) {
		return await db.getRepository('drive_file').delete(where);
	}

	public async create(
		src: string,
		alt?: string,
		sensitive?: boolean,
		user?: GenericId
	): Promise<false | ObjectLiteral> {
		const id = IdService.generate();

		let file = {
			id: id,
			src: src,
			alt: alt,
			userId: user,
			sensitive: sensitive,
			createdAt: new Date().toISOString()
		};

		return await db
			.getRepository('drive_file')
			.insert(file)
			.then(async () => {
				return this.get({ id: id });
			})
			.catch(() => {
				return false;
			});
	}
}

export default new DriveService();
