import process from 'node:process';
import cluster from 'cluster';
import pkg from '../../../package.json' with { type: 'json' };

let processId = cluster.isPrimary ? 'Main' : 'Worker ' + cluster.worker.id;
process.title = `Aster v${pkg.version} (${processId})`;

import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { createServer } from 'node:http';
//import { Server } from 'socket.io';

import config from './utils/config.js';
import Logger from './utils/logger.js';
import db from './utils/database.js';
import search from './utils/sonic/search.js';
import ingest from './utils/sonic/ingest.js';
import requestLogger from './utils/requestLogger.js';
import { deliverWorker, inboxWorker } from './utils/workers.js';

import router from './routes/router.js';
/*
	an error here can be ignored.
	it may not exist yet, but upon build it will.
*/
import { handler } from 'frontend/build/handler.js';

await db.initialize().catch((e) => {
	Logger.fatal('db', e);
});

if (config.get().sonic.enabled) {
	await search;
	await ingest;
}

const app = express();

inboxWorker.on('progress', async (job, progress) => {
	Logger.info('inbox', `job ${job.id} says ${progress}`);
});

inboxWorker.on('completed', (job) => {
	Logger.done('inbox', `job ${job.id} completed.`);
});

inboxWorker.on('failed', (job, failedReason) => {
	Logger.error('inbox', `job ${job.id} failed. ${failedReason}`);
	Logger.debug('inbox', job.stacktrace);
});

deliverWorker.on('progress', async (job, progress) => {
	Logger.info('deliver', `job ${job.id} says ${progress}`);
});

deliverWorker.on('completed', (job) => {
	Logger.done('deliver', `job ${job.id} completed.`);
});

deliverWorker.on('failed', (job, failedReason) => {
	Logger.error('deliver', `job ${job.id} failed. ${failedReason}`);
	Logger.debug('deliver', job.stacktrace);
});

app.use(requestLogger.dev, requestLogger.combined);
app.use(bodyParser.raw({ type: '*/*', limit: '500mb' }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader('TDM-Reservation', '1');

	// media has 1 day cache
	if (req.path.startsWith('/uploads')) {
		res.setHeader('Cache-Control', 'public, max-age=86400');
	}

	if (
		req.headers['user-agent'].match(
			new RegExp(config.get().security.blockedUserAgents.join('|'), 'i')
		)
	) {
		Logger.info(
			'security',
			'blocked request from useragent ' + req.headers['user-agent']
		);

		res.status(403).end();

		next(403);
	}

	next();
});

const server = createServer(app);
/*
const io = new Server(server);

io.on('connection', (socket) => {
	Logger.debug( 'ws', 'client connected. total: ' + io.engine.clientsCount);
	socket.broadcast.emit('guests', io.engine.clientsCount);
	socket.on('disconnect', () => {
		Logger.debug(
			'ws',
			'client disconnected. total: ' + io.engine.clientsCount
		);
		socket.broadcast.emit('guests', io.engine.clientsCount);
	});
	socket.on('message', (message) => {
		Logger.debug( 'ws', 'received message: ' + message);
	});
});
*/

app.use('/', router);

if (config.get().frontend.enable) {
	app.use(handler);
} else {
	Logger.info('core', `frontend disabled`);
}

server.listen(config.get().port, () => {
	process.send({
		msgFromWorker: 'worker ' + processId + ' listening'
	});
});

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
