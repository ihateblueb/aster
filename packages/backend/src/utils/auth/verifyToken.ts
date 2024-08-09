import db from '../database.js';

export default async function verifyToken(req, cookie?) {
	if (cookie) {
		if (req.cookies.a_token) {
			var grabbedUserAuth = await db.getRepository('user_auth').findOne({
				where: {
					token: req.cookies.a_token
				}
			});

			if (
				grabbedUserAuth &&
				grabbedUserAuth.token === req.cookies.a_token
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
				status: 401,
				message: 'No authorization cookie.',
				cookies: req.cookies
			};
		}
	} else {
		if (!req.headers.authorization) {
			return {
				status: 401,
				message: 'No authorization header.'
			};
		} else {
			if (req.headers.authorization.startsWith('Bearer ')) {
				var grabbedUserAuth = await db
					.getRepository('user_auth')
					.findOne({
						where: {
							token: req.headers.authorization.replace(
								'Bearer ',
								''
							)
						}
					});

				if (
					grabbedUserAuth &&
					grabbedUserAuth.token ===
						req.headers.authorization.replace('Bearer ', '')
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
}
