import db from '../utils/database.js';

class UserAuthService {
	public async verifyToken(req, cookie?: boolean) {
		if (cookie) {
			if (req.cookies.a_token) {
				let grabbedUserAuth = await db
					.getRepository('user_auth')
					.findOne({
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
					let grabbedUserAuth = await db
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
}

export default new UserAuthService();
