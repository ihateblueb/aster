import express from 'express';

import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.patch(
	'/api/user/:id',
	oapi.path({
		description: 'Update a user',
		tags: ['User'],
		requestBody: {
			content: {
				'application/json': {
					type: 'object'
				}
			}
		},
		responses: {
			200: {
				description: 'Return an updated user.',
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
			413: { $ref: '#/components/responses/error-413' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	(req, res) => {
		return res.status(501).send();
	}
);

export default router;
