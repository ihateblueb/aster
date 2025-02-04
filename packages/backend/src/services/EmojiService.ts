import db from '../utils/database.js';

class EmojiService {
	public async get(where: where) {
		return await db
			.getRepository('emoji')
			.createQueryBuilder('emoji')
			.leftJoinAndSelect('emoji.file', 'file')
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
			.getRepository('emoji')
			.createQueryBuilder('emoji')
			.leftJoinAndSelect('emoji.file', 'file')
			.where(where)
			.orWhere(orWhere ?? where)
			.take(take)
			.orderBy(order, orderDirection)
			.getMany();
	}
}

export default new EmojiService();
