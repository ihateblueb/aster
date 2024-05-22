import { Worker, Job } from 'bullmq';

import logger from './logger.js';
import acceptInboxRequest from './ap/acceptInboxRequest.js';

const inboxWorker = new Worker('inbox', async (job) => {
	logger('debug', 'ap', 'inbox worker was called');

	acceptInboxRequest(JSON.parse(job.data.body));
});

export default { inboxWorker };
