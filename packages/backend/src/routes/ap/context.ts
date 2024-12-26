import express from 'express';

import customContext from '../../static/customContext.js';
import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/context.json',
	oapi.path({
		description: 'Fetch the context of ActivityPub objects',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				description: 'Return context of ActivityPub objects.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res, next) => {
		res.setHeader('Content-Type', 'application/activity+json');

		return res.status(200).json(customContext);
	}
);

export default router;
