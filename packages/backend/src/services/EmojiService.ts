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

	public async getMany(where: where) {
		return await db
			.getRepository('emoji')
			.createQueryBuilder('emoji')
			.leftJoinAndSelect('emoji.file', 'file')
			.where(where)
			.getMany();
	}
}

export default new EmojiService();
