import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import db from '../../../../utils/database.js';
import logger from '../../../../utils/logger.js';

const router = express.Router();

router.post('/api/v1/login', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.body) {
		return res.status(400).json({
			message: 'Body required'
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
				message: 'Username required'
			});
		} else if (!pass) {
			res.status(400).json({
				message: 'Password required'
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
							message: 'Account suspended'
						});
					} else if (grabbedUser.deactivated) {
						res.status(401).json({
							message: 'Account deactivated'
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
							async (e, result) => {
								if (e) {
									logger('error', 'auth', e);
								}
								if (result) {
									const token = crypto
										.randomBytes(64)
										.toString('hex');

									await db
										.getRepository('users_auth')
										.insert({
											id: uuidv4(),
											user: grabbedUser.id,
											created_at: new Date(
												Date.now()
											).toISOString(),
											token: token
										});

									res.status(200).json({
										token: token
									});
								} else {
									res.status(401).json({
										message: 'Incorrect password'
									});
								}
							}
						);
					}
				} else {
					res.status(400).json({
						message: 'Account is not local'
					});
				}
			} else {
				res.status(404).json({
					message: 'Account does not exist'
				});
			}
		}
	}
});

export default router;
