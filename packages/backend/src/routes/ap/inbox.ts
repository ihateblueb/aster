import express from 'express';

import ApInboxService from '../../services/ap/ApInboxService.js';
import QueueService from '../../services/QueueService.js';
import WorkerService from '../../services/WorkerService.js';

const router = express.Router();

router.post(
	['/inbox', '/users/:id/inbox'],
	oapi.path({
		description: 'Send an activity to the instance',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {}
			}
		},
		responses: {
			200: {
				content: {
					'application/activity+json': {}
				}
			},
			202: { $ref: '#/components/responses/error-202' },
			400: { $ref: '#/components/responses/error-400' },
			401: { $ref: '#/components/responses/error-401' },
			403: { $ref: '#/components/responses/error-403' },
			404: { $ref: '#/components/responses/error-404' },
			500: { $ref: '#/components/responses/error-500' }
		}
	}),
	async (req, res, next) => {
		await QueueService.inbox.add('inbox', JSON.parse(req.body));

		return res.status(501).send();
	}
);

export default router;
