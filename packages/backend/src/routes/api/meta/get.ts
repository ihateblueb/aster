import express from 'express';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/api/meta',
	oapi.path({
		description: 'Fetch metadata of instance',
		tags: ['Meta'],
		responses: {
			200: {
				description: 'Return instance metadata.',
				content: {
					'application/json': {
						$ref: '#/components/schemas/Meta'
					}
				}
			},
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
