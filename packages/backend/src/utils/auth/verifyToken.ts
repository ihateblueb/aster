import db from '../database.js';

export default async function verifyToken(authHeader) {
	if (!authHeader) {
		return {
			status: 401,
			message: 'No authorization header.'
		};
	} else {
		if (!authHeader.startsWith('Bearer ')) {
			return {
				status: 400,
				message: 'Incorrect authorization type. Must be bearer.'
			};
		} else {
			var grabbedUserAuth = await db.getRepository('users_auth').findOne({
				where: {
					token: authHeader.replace('Bearer ', '')
				}
			});

			if (
				!grabbedUserAuth &&
				!grabbedUserAuth.token === authHeader.replace('Bearer ', '')
			) {
				return {
					status: 401,
					message: 'Invalied authentication token.'
				};
			} else {
				return {
					status: 200,
					message: 'Authorized',
					grabbedUserAuth: grabbedUserAuth
				};
			}
		}
	}
}
