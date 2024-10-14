import * as uuid from 'uuid';

import config from '../utils/config.js';
import db from '../utils/database.js';
import locale from '../utils/locale.js';

class NoteService {
	public async get(where: object) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.where(where)
			.getOne();
	}

	public async getMany(where: object) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.where(where)
			.getQueryAndParameters();
	}

	public async create(
		user: string,
		cw: string,
		content: string,
		visibility?: string
	) {
		if (content && content.length <= 0)
			return {
				error: true,
				status: 400,
				message: locale.note.contentTooShort
			};

		if (cw && cw.length > config.limits.soft.cw)
			return {
				error: true,
				status: 400,
				message: locale.note.contentWarningTooLong
			};

		if (content.length > config.limits.soft.note)
			return {
				error: true,
				status: 400,
				message: locale.note.contentTooLong
			};

		if (!['public', 'unlisted', 'followers', 'direct'].includes(visibility))
			return {
				error: true,
				status: 400,
				message: locale.note.visibilityInvalid
			};

		const instanceUrl = new URL(config.url);

		const id = uuid.v7();

		let note = {
			id: id,
			apId: instanceUrl.href + 'notes/' + id,
			userId: user,
			cw: cw,
			content: content,
			visibility: visibility,
			createdAt: new Date().toISOString()
		};

		return await db
			.getRepository('note')
			.insert(note)
			.then((e) => {
				return {
					error: false,
					status: 200,
					message: locale.note.created,
					note: note
				};
			})
			.catch((e) => {
				console.log(e);
				return {
					error: true,
					status: 500,
					message: locale.note.failedCreate
				};
			});
	}
}

export default new NoteService();
