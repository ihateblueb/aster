import express from 'express';

import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/api/notification/:id',
	oapi.path({
		description: 'Fetch a notification',
		tags: ['Notification'],
		responses: {
			200: {
				description: 'Return a notification.',
				content: {
					'application/json': {
						$ref: '#/components/schemas/Notification'
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
		if (!req.params.id)
			return res.status(400).json({
				message: 'Notification not specified'
			});

		res.status(501);
	}
);

export default router;
