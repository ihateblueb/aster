import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import * as uuid from 'uuid';

import config from '../utils/config.js';
import db from '../utils/database.js';

class NoteService {
	public async get(where: object) {
		// todo: joins needed here
		return await db.getRepository('user').findOne({ where: where });
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

		await db
			.getRepository('note')
			.insert(note)
			.catch((e) => {
				return {
					error: true,
					status: 500,
					message: 'Failed to insert note'
				};
			});

		return {
			error: false,
			status: 200,
			message: 'Note created',
			note: note
		};
	}
}

export default new NoteService();
