import verifyToken from '../utils/auth/verifyToken.js';
import db from '../utils/database.js';

export default async (req, res, next) => {
	let authRes = await verifyToken(req);

	if (authRes.status === 200) {
		let grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: authRes.grabbedUserAuth.user
			}
		});

		if (grabbedUser.mod) {
			next();
		} else {
			res.status(401).json({
				message: 'User is not a mod'
			});
		}
	} else {
		res.status(authRes.status).json({
			message: authRes.message
		});
	}
};
