import express from 'express';

import oapi from '../../utils/apidoc.js';
import NodeinfoService from '../../services/NodeinfoService.js';

const router = express.Router();

router.get(
	'/nodeinfo/2.0',
	oapi.path({
		description: 'Fetch nodeinfo 2.0 of instance',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return instance nodeinfo.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'application/activity+json');

		return res.status(200).json(await NodeinfoService.render('2.0'));
	}
);

router.get(
	'/nodeinfo/2.1',
	oapi.path({
		description: 'Fetch nodeinfo 2.1 of instance',
		tags: ['Federation'],
		responses: {
			200: {
				description: 'Return instance nodeinfo.',
				content: {
					'application/activity+json': {}
				}
			},
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res) => {
		res.setHeader('Content-Type', 'application/activity+json');

		return res.status(200).json(await NodeinfoService.render('2.1'));
	}
);

export default router;
