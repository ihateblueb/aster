import crypto from 'crypto';
import * as uuid from 'uuid';

import db from '../utils/database.js';
import UserService from './UserService.js';

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

	public async verify(token: string) {
		let grabbedToken = await db.getRepository('auth').findOne({
			token: token
		});

		if (!grabbedToken)
			return {
				error: true,
				status: 400,
				message: 'Token invalid'
			};

		let user = await UserService.get(grabbedToken.user);

		return {
			error: false,
			status: 200,
			user: grabbedToken.user,
			role: user.admin ? 'admin' : user.mod ? 'mod' : null
		};
	}
}

export default new AuthService();
