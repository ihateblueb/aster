import express from 'express';

import ApValidationService from '../../services/ap/ApValidationService.js';
import QueueService from '../../services/QueueService.js';
import oapi from '../../utils/apidoc.js';
import logger from '../../utils/logger.js';

const router = express.Router();

router.post(
	['/inbox', '/users/:id/inbox'],
	oapi.path({
		description: 'Send an activity to the instance',
		tags: ['Federation'],
		requestBody: {
			content: {
				'application/activity+json': {},
				'application/ld+json': {}
			}
		},
		responses: {
			200: {
				content: {
					'application/application+json': {}
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
		try {
			if (!ApValidationService.validBody(JSON.parse(req.body)))
				res.status(400).json({ message: 'Invalid body' });
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: "Couldn't parse body" });
		}

		const apvs = await ApValidationService.validSignature(
			req,
			String(JSON.parse(req.body).type)
		);

		if (!apvs.valid && apvs.pretendToProcess) res.status(202).json();
		if (!apvs.valid && !apvs.pretendToProcess)
			res.status(401).json({ message: 'Invalid signature' });

		if (apvs.valid)
			return await QueueService.inbox
				.add('{inbox}', JSON.parse(req.body))
				.then(() => {
					return res.status(202).send();
				})
				.catch((err) => {
					console.log(err);
					logger.error('inbox', 'failed to add activity to queue');
					return res.status(500).send();
				});
	}
);

export default router;
