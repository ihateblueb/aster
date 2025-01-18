import db from '../utils/database.js';

class MoodService {
	public async get(where: where) {
		return await db
			.getRepository('mood')
			.createQueryBuilder('mood')
			.leftJoinAndSelect('mood.user', 'user')
			.where(where)
			.getOne();
	}

	public async getMany(
		where: where,
		take?: number,
		order?: string,
		direction?: 'ASC' | 'DESC',
		orWhere?: where,
		andWhere?: where
	) {
		return await db
			.getRepository('mood')
			.createQueryBuilder('mood')
			.leftJoinAndSelect('mood.user', 'user')
			.where(where)
			.orWhere(orWhere ?? where)
			.andWhere(andWhere ?? where)
			.take(take)
			.orderBy(order, direction)
			.getMany();
	}
}

export default new MoodService();
