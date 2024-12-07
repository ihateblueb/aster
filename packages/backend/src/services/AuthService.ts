import crypto from 'crypto';

import db from '../utils/database.js';
import locale from '../utils/locale.js';
import IdService from './IdService.js';

class AuthService {
	public async generateToken(user: GenericId) {
		const token = crypto.randomBytes(16).toString('hex');

		await db.getRepository('auth').insert({
			id: IdService.generate(),
			user: user,
			createdAt: new Date(Date.now()).toISOString(),
			token: token
		});

		return token;
	}

	public async verify(token: string) {
		if (!token || token.length <= 0)
			return {
				error: true,
				status: 401,
				message: locale.auth.tokenInvalid
			};

		const grabbedToken = await db.getRepository('auth').findOne({
			where: {
				token: token.replace('Bearer ', '')
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
