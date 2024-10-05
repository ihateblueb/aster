import cluster from 'cluster';
import express from 'express';

import RouterService from './services/RouterService.js';

import logger from './utils/logger.js';
import pkg from '../../../package.json' with { type: 'json' };

let processId = cluster.isPrimary ? 'Main' : 'Worker ' + cluster.worker.id;
process.title = `Aster v${pkg.version} (${processId})`;

const app = express();
const port = 9972;

app.use('/', RouterService);

app.listen(port, () => {
	logger.done('boot', 'worker started');
});
