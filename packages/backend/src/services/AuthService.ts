import crypto from 'crypto';
import * as uuid from 'uuid';

import db from '../utils/database.js';

class AuthService {
	public async generateToken(user: string) {
		const token = crypto.randomBytes(64).toString('hex');

		await db.getRepository('auth').insert({
			id: uuid.v7(),
			user: user,
			created_at: new Date(Date.now()).toISOString(),
			token: token
		});

		return token;
	}

	public verify() {}
}

export default new AuthService();
