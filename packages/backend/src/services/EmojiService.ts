import db from '../utils/database.js';
import ConfigService from './ConfigService.js';
import DriveService from './DriveService.js';
import IdService from './IdService.js';

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

	public async create(shortcode: string, file: string, category?: string) {
		let driveFile = await DriveService.get({ id: file });
		if (!driveFile)
			return {
				error: true,
				status: 404,
				message: 'File not found'
			};

		const id = IdService.generate();

		let emoji = {
			id: id,
			apId: ConfigService.url.href + 'emojis/' + id,
			shortcode: shortcode,
			category: category,
			fileId: file,
			createdAt: new Date().toISOString()
		};

		return await db
			.getRepository('emoji')
			.insert(emoji)
			.then(async () => {
				return {
					error: false,
					status: 200,
					emoji: await this.get({ id: id })
				};
			});
	}
}

export default new EmojiService();
