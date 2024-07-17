import express from 'express';

import deliverQueue from '../../../../utils/deliverQueue.js';
import inboxQueue from '../../../../utils/inboxQueue.js';

const router = express.Router();

router.get('/api/v2/metrics/queue', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const inboxCompleted = await inboxQueue.getMetrics('completed');
	const inboxFailed = await inboxQueue.getMetrics('failed');
	const inboxAwaiting = await inboxQueue.count();

	const deliverCompleted = await deliverQueue.getMetrics('completed');
	const deliverFailed = await deliverQueue.getMetrics('failed');
	const deliverAwaiting = await deliverQueue.count();

	res.status(200).json({
		inbox: {
			completed: inboxCompleted,
			failed: inboxFailed,
			awaiting: inboxAwaiting
		},
		deliver: {
			completed: deliverCompleted,
			failed: deliverFailed,
			awaiting: deliverAwaiting
		}
	});
});

export default router;
