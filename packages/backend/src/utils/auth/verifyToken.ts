import db from '../database.js';

export default async function verifyToken(authHeader) {
	if (!authHeader) {
		return {
			status: 401,
			message: 'No authorization header.'
		};
	} else {
		if (authHeader.startsWith('Bearer ')) {
			var grabbedUserAuth = await db.getRepository('user_auth').findOne({
				where: {
					token: authHeader.replace('Bearer ', '')
				}
			});

			if (
				grabbedUserAuth &&
				grabbedUserAuth.token === authHeader.replace('Bearer ', '')
			) {
				return {
					status: 200,
					message: 'Authorized',
					grabbedUserAuth: grabbedUserAuth
				};
			} else {
				return {
					status: 401,
					message: 'Invalid authentication token.'
				};
			}
		} else {
			return {
				status: 400,
				message: 'Incorrect authorization type.'
			};
		}
	}
}
