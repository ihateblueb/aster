import process from 'node:process';
import pkg from '../../../package.json' with { type: 'json' };
process.title = `Aster v${pkg.version} (Main)`;

import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import logger from './utils/logger.js';
import config from './utils/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

logger.info('boot', 'machine has ' + cpuCount + ' cores');
logger.info('boot', 'worker count configured to ' + config.get().workers.count);

cluster.setupPrimary({
	exec: __dirname + '/server.js'
});

try {
	if (config.get().plugins && config.get().plugins.boot) {
		config.get().plugins.boot.forEach((e) => {
			logger.info('plugin', `registered boot plugin ${e}`);
		});

		config.get().plugins.boot.forEach(async (e) => {
			await import(`./plugins/boot/${e}.js`).then((plugin) => {
				plugin.default();
			});
		});
	}
} catch (e) {
	logger.debug('plugin', e);
}

if (config.get().plugins && config.get().plugins.incoming) {
	config.get().plugins.incoming.forEach((e) => {
		logger.info('plugin', `registered incoming plugin ${e}`);
	});
}

if (config.get().plugins && config.get().plugins.outgoing) {
	config.get().plugins.outgoing.forEach((e) => {
		logger.info('plugin', `registered outgoing plugin ${e}`);
	});
}

for (let i = 0; i < config.get().workers.count; i++) {
	cluster.fork();
}

cluster.on('online', (worker) => {
	logger.info('boot', 'worker ' + worker.id + ' is now online');
});

/*
cluster.on('exit', (worker, code, signal) => {
	logger.error(
		'main',
		'worker ' +
			worker.id +
			' exited (' +
			code +
			'/' +
			signal +
			'). starting another.'
	);
	cluster.fork();
});
*/

cluster.on('died', (worker, code, signal) => {
	logger.error(
		'main',
		'worker ' +
			worker.id +
			' died (' +
			code +
			'/' +
			signal +
			'). starting another.'
	);
	cluster.fork();
});

let saysUp = 0;

cluster.on('message', (msg) => {
	saysUp++;

	if (saysUp == config.get().workers.count) {
		logger.info(
			'main',
			'server started as ' +
				config.get().url +
				' on port ' +
				config.get().port
		);
	}
});
