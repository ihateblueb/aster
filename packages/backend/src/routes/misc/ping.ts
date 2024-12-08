import express from 'express';

import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/ping',
	oapi.validPath({
		description: 'Ping server',
		tags: ['Miscellaneous'],
		responses: {
			200: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								serverTime: { type: 'string' }
							}
						}
					}
				}
			}
		}
	}),
	(req, res) => {
		res.status(200).json({
			serverTime: new Date(Date.now()).toISOString()
		});
	}
);

export default router;
