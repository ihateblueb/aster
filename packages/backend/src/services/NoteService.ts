import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import * as uuid from 'uuid';

import { Note } from '../entities/Note.js';
import config from '../utils/config.js';
import db from '../utils/database.js';
import logger from '../utils/logger.js';

class NoteService {
	public async get(where: object) {
		return await db
			.getRepository('note')
			.createQueryBuilder('note')
			.leftJoinAndSelect('note.user', 'user')
			.loadAllRelationIds()
			.where(where)
			.getOne();
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
				message: 'Content too short'
			};

		if (cw && cw.length > config.limits.soft.cw)
			return {
				error: true,
				status: 400,
				message: 'Content warning too long'
			};

		if (content.length > config.limits.soft.note)
			return {
				error: true,
				status: 400,
				message: 'Content too long'
			};

		if (!['public', 'unlisted', 'followers', 'direct'].includes(visibility))
			return {
				error: true,
				status: 400,
				message: 'Visibility invalid'
			};

		const instanceUrl = new URL(config.url);

		const id = uuid.v7();

		console.log('userId for inserted note is ' + user);

		let note = {
			id: id,
			apId: instanceUrl.href + 'notes/' + id,
			userId: user,
			local: true,
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
					message: 'Note created',
					note: note
				};
			})
			.catch((e) => {
				console.log(e);
				return {
					error: true,
					status: 500,
					message: 'Failed to insert note'
				};
			});
	}
}

export default new NoteService();
