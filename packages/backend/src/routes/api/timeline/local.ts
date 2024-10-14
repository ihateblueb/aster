import express from 'express';

import TimelineService from '../../../services/TimelineService.js';
import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/api/timeline/local',
	oapi.path({
		description: 'Fetch a timeline of notes from this instance',
		tags: ['Timeline'],
		responses: {
			200: {
				description: 'Return a timeline.'
			},
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		TimelineService.get();

		res.status(501).send();
	}
);

export default router;
