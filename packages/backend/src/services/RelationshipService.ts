import db from '../utils/database.js';

class RelationshipService {
	public async getFollowing(from: string) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.where({
				from: from
			})
			.select('to')
			.getMany();
	}
	public async getFollowers(to: string) {
		return await db
			.getRepository('relationship')
			.createQueryBuilder('relationship')
			.where({
				to: to
			})
			.select('from')
			.getMany();
	}
}

export default new RelationshipService();
