import express from 'express';

import verifyToken from '../../../../utils/auth/verifyToken.js';
import db from '../../../../utils/database.js';
import Logger from '../../../../utils/logger.js';
import sanitize from '../../../../utils/sanitize.js';
import getSigned from '../../../../utils/ap/getSigned.js';
import updateRemoteActor from '../../../../utils/ap/updateRemoteActor.js';

const router = express.Router();

router.get('/api/v2/user/:userid/update', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.userid) {
		return res.status(400).json({
			message: 'User ID parameter required'
		});
	} else {
		let grabbedUser = await db.getRepository('user').findOne({
			where: {
				id: req.params.userid
			}
		});

		if (grabbedUser) {
			if (grabbedUser.suspended) {
				return res.status(410).json({
					message: 'User suspended'
				});
			} else if (grabbedUser.deactivated) {
				return res.status(410).json({
					message: 'User deactivated'
				});
			} else {
				if (!grabbedUser.local) {
					Logger.debug('ap', 'actor update requested');

					let response;

					let newUser = await getSigned(grabbedUser.ap_id);

					if (newUser.status === 401) {
						response = 'gone';
					} else if (newUser.status === 410) {
						response = 'gone';
					} else if (!newUser.status) {
						// idk? just trying things
						response = 'gone';
					} else {
						Logger.debug('ap', 'fetched actor sucessfully');
						response = await updateRemoteActor(newUser.data);
					}

					if (response) {
						return res.status(200).json(response);
					} else {
						return res.status(500).json({
							message: 'Failed to grab user'
						});
					}
				} else {
					return res.status(500).json({
						message: 'Cannot update local user'
					});
				}
			}
		} else {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
	}
});

export default router;
