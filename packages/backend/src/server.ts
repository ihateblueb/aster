import * as http from 'node:http';

import cluster from 'cluster';
import express from 'express';

import pkg from '../../../package.json' with { type: 'json' };
import ConfigService from './services/ConfigService.js';
import MetricsService from './services/MetricsService.js';
import RouterService from './services/RouterService.js';
import SetupService from './services/SetupService.js';
import WebsocketService from './services/WebsocketService.js';
import WorkerService from './services/WorkerService.js';
import db from './utils/database.js';
import database from './utils/database.js';
import logger from './utils/logger.js';

const processId = cluster.isPrimary ? 'Main' : 'Worker ' + cluster.worker.id;
process.title = `Aster v${pkg.version} (${processId})`;

await db.initialize().catch((e) => {
	console.log(e);
	logger.fatal('boot', "couldn't initialize database connection");
});

await SetupService.try();

if (ConfigService.metrics.enabled) MetricsService.registerMetrics();

WorkerService.inbox.on('completed', (job) => {
	logger.done('inbox', 'job ' + job.id + ' completed');
});
WorkerService.inbox.on('failed', (job) => {
	logger.error('inbox', 'job ' + job.id + ' failed');
});

WorkerService.deliver.on('completed', (job) => {
	logger.done('deliver', 'job ' + job.id + ' completed');
});
WorkerService.deliver.on('failed', (job) => {
	logger.error('deliver', 'job ' + job.id + ' failed');
});

WorkerService.backfill.on('completed', (job) => {
	logger.done('backfill', 'job ' + job.id + ' completed');
});
WorkerService.backfill.on('failed', (job) => {
	logger.error('backfill', 'job ' + job.id + ' failed');
});

const app = express();

app.use('/', RouterService);

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) =>
	WebsocketService.server(request, socket, head)
);

server.listen(ConfigService.port, () => {
	logger.done(
		'boot',
		'worker ' +
			(cluster.isPrimary ? '*' : cluster.worker.id) +
			' listening on ' +
			ConfigService.port
	);
});

async function shutdown() {
	logger.info('exit', 'shutting down');

	WebsocketService.globalEmitter.removeAllListeners();
	WebsocketService.userEmitter.removeAllListeners();
	logger.debug('exit', 'websocket events closed');

	server.closeAllConnections();
	logger.debug('exit', 'http server closed');

	await WorkerService.inbox.close();
	await WorkerService.deliver.close();
	await WorkerService.backfill.close();
	logger.debug('exit', 'queue workers closed');

	await database.destroy();
	logger.debug('exit', 'db connection closed');

	process.exit();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
