import path from 'node:path';

import accepts from '@fastify/accepts';
import auth from '@fastify/auth';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import ratelimit from '@fastify/rate-limit';
import staticdir from '@fastify/static';
import swagger from '@fastify/swagger';
import websocket from '@fastify/websocket';
import apidoc from '@scalar/fastify-api-reference';
import cluster from 'cluster';
import Fastify from 'fastify';
import { handler } from 'frontend/build/handler.js';
import secureJson from 'secure-json-parse';

import pkg from '../../../package.json' with { type: 'json' };
import AuthService from './services/AuthService.js';
import ConfigService from './services/ConfigService.js';
import IdService from './services/IdService.js';
import MetricsService from './services/MetricsService.js';
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

const fastify = Fastify({
	logger: false,
	genReqId: () => IdService.generate(),
	requestIdHeader: 'X-Request-Id'
});

fastify
	// misc
	.register(accepts)
	.register(cors)
	.register(ratelimit, {
		max: 100,
		timeWindow: '1 minute'
	})
	.register(websocket)
	// docs
	.register(swagger, {
		openapi: {
			info: {
				title: 'Aster Route Reference',
				version: pkg.version
			},
			components: {
				securitySchemes: {
					header: {
						type: 'http',
						scheme: 'bearer'
					}
				}
			}
		}
	})
	.register(apidoc, {
		routePrefix: '/api-doc',
		configuration: {}
	})
	// auth
	.decorate('requireAuth', async (req, reply) => {
		let auth = await AuthService.verify(req.headers.authorization);
		if (auth.error) throw new Error(auth.message);
		req.auth = auth;
	})
	.decorate('optionalAuth', async (req, reply, done) => {
		req.auth = await AuthService.verify(req.headers.authorization);
	})
	.register(auth)
	// routes
	.register(autoload, {
		dir: path.join(process.cwd(), 'built', 'routes')
	})
	.register(multipart, {
		limits: {
			files: 12
		}
	})
	.register(staticdir, {
		root: path.resolve(process.cwd(), '..', '..', 'uploads'),
		prefix: '/uploads'
	})
	.get('/*', (req, reply) => {
		handler(req.raw, reply.raw, () => {});
	});

const parser = (req, rawBody, done) => {
	try {
		const json = secureJson.parse(rawBody.toString('utf8'), null, {
			protoAction: 'ignore',
			constructorAction: 'ignore'
		});
		done(null, json);
	} catch (err) {
		err.statusCode = 400;
		return done(err);
	}
};

fastify.addContentTypeParser(
	'application/activity+json',
	{ parseAs: 'buffer' },
	parser
);
fastify.addContentTypeParser(
	'application/ld+json',
	{ parseAs: 'buffer' },
	parser
);

/*
* todo: convert
	res.setHeader('TDM-Reservation', '1');

	if (req.path.startsWith('/uploads'))
		res.setHeader('Cache-Control', 'public, max-age=86400');

	if (
		req.headers['user-agent'] &&
		req.headers['user-agent'].match(
			new RegExp(ConfigService.security.blockedUserAgents.join('|'), 'i')
		)
	) {
		logger.info(
			'security',
			'blocked request from useragent ' + req.headers['user-agent']
		);

		return res.status(401).send();
	}
* */

fastify
	.addHook('preHandler', (req, reply, done) => {
		if (
			req.url &&
			!req.url.startsWith('/_app') &&
			!req.url.startsWith('/api/queues') &&
			!req.url.startsWith('/queue/api') &&
			!req.url.startsWith('/queue/static') &&
			!req.url.startsWith('/metrics')
		)
			logger.http(
				'-->',
				`${req.method.toLowerCase()} ${req.url} ${logger.formatHttpId(req.id)}`
			);
		done();
	})
	.addHook('onResponse', (req, reply, done) => {
		if (
			req.url &&
			!req.url.startsWith('/_app') &&
			!req.url.startsWith('/api/queues') &&
			!req.url.startsWith('/queue/api') &&
			!req.url.startsWith('/queue/static') &&
			!req.url.startsWith('/metrics')
		)
			logger.http(
				'<--',
				`${req.method.toLowerCase()} ${req.url} ${logger.formatStatus(reply.statusCode)} ${logger.formatHttpId(req.id)}`
			);
		done();
	});

await fastify.ready();

fastify.listen({ port: ConfigService.port }, function (err, addr) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	logger.done('boot', 'started on ' + addr);
});

async function shutdown() {
	logger.info('exit', 'shutting down');

	WebsocketService.globalEmitter.removeAllListeners();
	WebsocketService.userEmitter.removeAllListeners();
	logger.debug('exit', 'websocket events closed');

	fastify.server.closeAllConnections();
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
