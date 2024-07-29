import process from 'node:process';
import pkg from '../../../package.json' with { type: 'json' };
process.title = `Aster v${pkg.version}`;

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import config from './utils/config.js';
import logger from './utils/logger.js';
import requestLogger from './utils/requestLogger.js';
import { deliverWorker, inboxWorker } from './utils/workers.js';

import router from './routes/router.js';
/*
	an error here can be ignored.
	it may not exist yet, but upon build it will.
*/
import { handler } from 'frontend/build/handler.js';

const app = express();

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
	logger('debug', 'deliver', JSON.stringify(job.stacktrace));
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
	logger('debug', 'deliver', JSON.stringify(job.stacktrace));
});

app.use(requestLogger.dev, requestLogger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('TDM-Reservation', '1');
	next();
});

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	logger('debug', 'ws', 'client connected. total: ' + io.engine.clientsCount);
	socket.broadcast.emit('guests', io.engine.clientsCount);
	socket.on('disconnect', () => {
		logger(
			'debug',
			'ws',
			'client disconnected. total: ' + io.engine.clientsCount
		);
		socket.broadcast.emit('guests', io.engine.clientsCount);
	});
	socket.on('message', (message) => {
		logger('debug', 'ws', 'received message: ' + message);
	});
});

app.use('/', router);

if (config.frontend.enable) {
	app.use(handler);
} else {
	logger('info', 'core', `frontend disabled`);
}

if (config.inbox.plugins) {
	config.inbox.plugins.forEach((e) => {
		logger('info', 'plugin', `registered inbox plugin ${e}`);
	});
}

if (config.deliver.plugins) {
	config.deliver.plugins.forEach((e) => {
		logger('info', 'plugin', `registered deliver plugin ${e}`);
	});
}

server.listen(config.port, () =>
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
