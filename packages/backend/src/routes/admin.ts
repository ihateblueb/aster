import express from 'express';

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

		if (grabbedUser.admin) {
			next();
		} else {
			res.status(401).json({
				message: 'User is not an admin'
			});
		}
	} else {
		res.status(authRes.status).json({
			message: authRes.message
		});
	}
};
