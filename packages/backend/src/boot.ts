import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import pkg from '../../../package.json' with { type: 'json' };
import logger from './utils/logger.js';

process.title = `Aster v${pkg.version} (Boot)`;

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;
const workerCount = 4;

logger.info('boot', 'machine has ' + cpuCount + ' cores');
logger.info('boot', 'worker count is ' + workerCount);

cluster.setupPrimary({
	exec: __dirname + '/server.js'
});

for (let i = 0; i < workerCount; i++) {
	cluster.fork();
}
