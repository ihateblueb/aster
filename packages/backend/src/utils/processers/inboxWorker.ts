import { Job } from 'bullmq';

import validateRequest from '../../utils/ap/validation.js';
import acceptInboxRequest from '../../utils/ap/acceptInboxRequest.js';
import logger from '../../utils/logger.js';

export default async function inboxWorker(job: Job) {
	try {
		logger('debug', 'ap', JSON.parse(job.data.req.body));

		validateRequest(job.data.req, job.data.res);

		acceptInboxRequest(JSON.parse(job.data.req.body), job.data.res);
	} catch (e) {
		logger('error', 'worker', e);
	}
}
