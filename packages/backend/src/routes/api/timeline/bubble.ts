import express from 'express';

import oapi from '../../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/api/timeline/bubble',
	oapi.path({
		description:
			'Fetch a timeline of public notes from instances in the local bubble',
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
		res.status(501).send();
	}
);

export default router;
