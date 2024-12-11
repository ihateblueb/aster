import express from 'express';

import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.post(
	'/api/bookmark',
	oapi.path({
		description: 'Create a bookmark',
		tags: ['Bookmarks'],
		responses: {
			200: {
				description: 'Return a bookmark.'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		return res.status(501).send();
	}
);

export default router;
