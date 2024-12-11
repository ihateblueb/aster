import express from 'express';

import MetricsService from '../../services/MetricsService.js';
import oapi from '../../utils/apidoc.js';

const router = express.Router();

router.get(
	'/metrics',
	oapi.validPath({
		description: 'Get instance metrics',
		tags: ['Miscellaneous'],
		responses: {
			200: {}
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'text/plain');
		return res.status(200).send(await MetricsService.registry.metrics());
	}
);

export default router;
