import express from 'express';

import ApInboxService from '../../services/ap/ApInboxService.js';
import ApValidationService from '../../services/ap/ApValidationService.js';
import QueueService from '../../services/QueueService.js';
import WorkerService from '../../services/WorkerService.js';
import oapi from '../../utils/apidoc.js';

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
		console.log(JSON.stringify(JSON.parse(req.body)));

		if (!ApValidationService.validBody(JSON.parse(req.body)))
			return {
				status: 400,
				message: 'Invalid body'
			};

		if (!(await ApValidationService.validSignature(req)))
			return {
				status: 401,
				message: 'Invalid signature'
			};

		await QueueService.inbox.add('inbox', JSON.parse(req.body));

		return res.status(202).send();
	}
);

export default router;
