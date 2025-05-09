import crypto from 'crypto';

import db from '../utils/database.js';
import locale from '../utils/locale.js';
import IdService from './IdService.js';
import TimeService from './TimeService.js';

class AuthService {
	public async generateToken(user: GenericId) {
		const token = crypto.randomBytes(16).toString('hex');

		await db.getRepository('auth').insert({
			id: IdService.generate(),
			userId: user,
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

		const grabbedToken = await db
			.getRepository('auth')
			.createQueryBuilder('auth')
			.leftJoinAndSelect('auth.user', 'user')
			.where({
				token: token.replace('Bearer ', '')
			})
			.getOne();

		if (!grabbedToken)
			return {
				error: true,
				status: 401,
				message: locale.auth.tokenInvalid
			};

		if (!grabbedToken.user)
			return {
				error: true,
				status: 401,
				message: locale.user.notFound
			};

		if (grabbedToken.user.suspended)
			return {
				error: true,
				status: 403,
				message: locale.user.suspended
			};

		if (!grabbedToken.user.activated)
			return {
				error: true,
				status: 403,
				message: locale.user.notActivated
			};

		// ~6 months
		if (
			TimeService.isTimeAgo(
				new Date(grabbedToken.createdAt),
				TimeService.week * 26
			)
		)
			return {
				error: true,
				status: 403,
				message: 'Token expired'
			};

		return {
			error: false,
			status: 200,
			user: grabbedToken.user
		};
	}
}

export default new AuthService();
