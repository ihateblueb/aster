import { Job } from 'bullmq';

import logger from '../logger.js';

export default async function inboxWorker(job: Job) {
	try {
		// lets move inbox code here.
	} catch (e) {
		logger('error', 'worker', e);
	}
}
