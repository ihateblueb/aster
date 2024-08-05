import ApiMeta from '../constructors/meta.js';
import db from '../utils/database.js';

export default async function generateMeta(grabbedMeta): Promise<{
	status?: number;
	meta?: ApiMeta;
	message?: string;
}> {
	if (grabbedMeta) {
		const grabbedLocalUserCount = await db
			.getRepository('user')
			.createQueryBuilder()
			.select('user')
			.where({ local: true })
			.getCount();

		const grabbedTotalUserCount = await db
			.getRepository('user')
			.createQueryBuilder()
			.select('user')
			.getCount();

		const grabbedLocalNoteCount = await db
			.getRepository('note')
			.createQueryBuilder()
			.select('note')
			.where({ local: true })
			.getCount();

		const grabbedTotalNoteCount = await db
			.getRepository('note')
			.createQueryBuilder()
			.select('note')
			.getCount();

		const grabbedInstanceCount = await db
			.getRepository('instance')
			.createQueryBuilder()
			.select('instance')
			.getCount();

		return {
			status: 200,
			meta: new ApiMeta(
				grabbedMeta,
				grabbedLocalUserCount,
				grabbedTotalUserCount,
				grabbedLocalNoteCount,
				grabbedTotalNoteCount,
				grabbedInstanceCount
			)
		};
	} else {
		return {
			status: 404,
			message: 'Meta not found'
		};
	}
}
