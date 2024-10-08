import express from 'express';
import oapi from '../../../utils/apidoc.js';

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
			404: { $ref: '#/components/responses/error-404' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		res.status(501).json({
			message: 'not done lol'
		});
	}
);

export default router;
