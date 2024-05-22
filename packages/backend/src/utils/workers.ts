import { Worker, Job } from 'bullmq';

import logger from './logger.js';
import validateRequest from './ap/validation.js';
import acceptInboxRequest from './ap/acceptInboxRequest.js';

const inboxWorker = new Worker('inbox', async (job: Job) => {
	logger('debug', 'ap', 'inbox worker was called');

	//validateRequest(job.data.req, job.data.res);

	//acceptInboxRequest(JSON.parse(job.data.req.body));
});

export default { inboxWorker };
