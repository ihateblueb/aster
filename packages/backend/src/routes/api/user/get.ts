import express from 'express';
import oapi from '../../../utils/apidoc.js';
import db from '../../../utils/database.js';

const router = express.Router();

router.get(
	'/api/user/:id',
	oapi.path({
		description: 'Fetch a user',
		tags: ['User'],
		responses: {
			200: {
				description: 'Return a user.',
				content: {
					'application/json': {
						$ref: '#/components/schemas/User'
					}
				}
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		if (req.params.id) {
			let user = await db.getRepository('user').findOne({
				where: {
					id: req.params.id
				}
			});

			if (user) {
				if (user.suspended) {
					res.status(403).json({
						message: 'User suspended'
					});
				} else if (!user.activated) {
					res.status(403).json({
						message: 'User not activated'
					});
				} else {
					res.status(200).json(user);
				}
			} else {
				res.status(404).json({
					message: "User doesn't exist"
				});
			}
		} else {
			res.status(400).json({
				message: 'User not specified'
			});
		}
	}
);

export default router;
