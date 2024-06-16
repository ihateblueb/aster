import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import process from 'node:process';

import pkg from '../../../package.json' with { type: 'json' };

import config from './utils/config.js';
import logger from './utils/logger.js';
import requestLogger from './utils/requestLogger.js';
import { deliverWorker, inboxWorker } from './utils/workers.js';

import router from './routes/router.js';
/* an error here can be ignored */
import { handler } from 'frontend/build/handler.js';

const app = express();

process.title = 'Aster';

console.log('                                        ');
console.log('            _____ _______ ______ _____  ');
console.log('     /\\    / ____|__   __|  ____|  __ \\ ');
console.log('    /  \\  | (___    | |  | |__  | |__) |');
console.log('   / /\\ \\  \\___ \\   | |  |  __| |  _  / ');
console.log('  / ____ \\ ____) |  | |  | |____| | \\ \\ ');
console.log(' /_/    \\_\\_____/   |_|  |______|_|  \\_\\');
console.log('                                        ');

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(' ');

inboxWorker.on('progress', async (job, progress) => {
	logger('info', 'inbox', `job ${job.id} says ${JSON.stringify(progress)}`);
});

inboxWorker.on('completed', (job) => {
	logger(
		'info',
		'inbox',
		`job ${job.id} completed. ${JSON.stringify(job.returnvalue)}`
	);
});

inboxWorker.on('failed', (job, failedReason) => {
	logger('error', 'inbox', `job ${job.id} failed. ${failedReason}`);
});

deliverWorker.on('progress', async (job, progress) => {
	logger('info', 'deliver', `job ${job.id} says ${JSON.stringify(progress)}`);
});

deliverWorker.on('completed', (job) => {
	logger(
		'info',
		'deliver',
		`job ${job.id} completed. ${JSON.stringify(job.returnvalue)}`
	);
});

deliverWorker.on('failed', (job, failedReason) => {
	logger('error', 'deliver', `job ${job.id} failed. ${failedReason}`);
});

app.use(requestLogger.dev, requestLogger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('TDM-Reservation', '1');
	next();
});

app.use('/', router);

if (config.frontend.enable) {
	app.use(handler);
} else {
	logger('info', 'core', `frontend disabled`);
}

app.listen(config.port, () =>
	logger(
		'info',
		'core',
		`started instance as ${config.url} on port ${config.port}`
	)
);

/*
const statsQueue = new Queue('stats', {
	connection: redisConnection,
	defaultJobOptions: {
		attempts: 1
	}
});

setInterval(function () {
	statsQueue.add(
		'stats',
		{
			time: new Date(Date.now()).toISOString()
		},
		{ jobId: uuidv4() }
	);
}, 5000);
*/
