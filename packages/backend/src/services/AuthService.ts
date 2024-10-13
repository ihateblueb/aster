import crypto from 'crypto';
import * as uuid from 'uuid';

import db from '../utils/database.js';
import locale from '../utils/locale.js';
import UserService from './UserService.js';

class AuthService {
	public async generateToken(user: string) {
		const token = crypto.randomBytes(64).toString('hex');

		await db.getRepository('auth').insert({
			id: uuid.v7(),
			user: user,
			createdAt: new Date(Date.now()).toISOString(),
			token: token
		});

		return token;
	}

	public async verify(token: string) {
		let grabbedToken = await db.getRepository('auth').findOne({
			where: {
				token: token
			}
		});

		if (!grabbedToken)
			return {
				error: true,
				status: 401,
				message: locale.auth.tokenInvalid
			};

		return {
			error: false,
			status: 200,
			user: grabbedToken.user
		};
	}
}

export default new AuthService();
