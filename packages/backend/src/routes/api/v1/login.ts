import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import db from '../../../utils/database.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

router.post('/api/v1/login', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.body) {
		return res.status(400).json({
			message: 'body required'
		});
	} else {
		/*
			body should look like this:
			{
				"Ymx1ZWI6ZmFrZXB3aW1ub3RzdHVwaWQ="
			}
			content is username and pw encoded in base64 separated by a colon
		*/

		const userPass = atob(req.body).split(/:(.*)/s);
		const user = userPass[0];
		const pass = userPass[1];

		if (!user) {
			res.status(400).json({
				message: 'username required'
			});
		} else if (!pass) {
			res.status(400).json({
				message: 'password required'
			});
		} else {
			var grabbedUser = await db.getRepository('users').findOne({
				where: {
					username: user
				}
			});

			if (grabbedUser) {
				if (grabbedUser.local) {
					if (grabbedUser.suspended) {
						res.status(401).json({
							message: 'account suspended'
						});
					} else if (grabbedUser.deactivated) {
						res.status(401).json({
							message: 'account deactivated'
						});
					} else {
						var grabbedUserPriv = await db
							.getRepository('users_priv')
							.findOne({
								where: {
									id: grabbedUser.id
								}
							});

						bcrypt.compare(
							pass,
							grabbedUserPriv.password,
							(e, result) => {
								if (e) {
									logger('error', 'auth', e);
								}
								console.log(result);
								if (result) {
									const token = crypto
										.randomBytes(64)
										.toString('hex');

									// insert to db along with expire date in the date format ending with a Z

									res.status(200).json(token);
								} else {
									res.status(401).json({
										message: 'incorrect password'
									});
								}
							}
						);
					}
				} else {
					res.status(400).json({
						message: 'account is not local'
					});
				}
			} else {
				res.status(404).json({
					message: 'account does not exist'
				});
			}
		}
	}
});

export default router;
