import cluster from 'cluster';
import express from 'express';

import pkg from '../../../package.json' with { type: 'json' };
import RouterService from './services/RouterService.js';
import config from './utils/config.js';
import db from './utils/database.js';
import logger from './utils/logger.js';

let processId = cluster.isPrimary ? 'Main' : 'Worker ' + cluster.worker.id;
process.title = `Aster v${pkg.version} (${processId})`;

await db
	.initialize()
	.then(() => {
		logger.done('boot', 'initialized database connection');
	})
	.catch((e) => {
		console.log(e);
		logger.fatal('boot', "couldn't initialize database connection");
	});

const app = express();

app.use('/', RouterService);

app.listen(config.port, () => {
	logger.done(
		'boot',
		'worker ' +
			(cluster.isPrimary ? '*' : cluster.worker.id) +
			' listening on ' +
			config.port
	);
});
