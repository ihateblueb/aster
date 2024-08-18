import process from 'node:process';
import pkg from '../../../package.json' with { type: 'json' };
process.title = `Aster v${pkg.version} (Main)`;

import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import Logger from './utils/logger.js';
import config from './utils/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

Logger.info('boot', 'machine has ' + cpuCount + ' cores');
Logger.info('boot', 'worker count configured to ' + config.get().workers.count);

cluster.setupPrimary({
	exec: __dirname + '/server.js'
});

if (config.get().plugins.boot) {
	config.get().plugins.boot.forEach((e) => {
		Logger.info('plugin', `registered boot plugin ${e}`);
	});

	config.get().plugins.boot.forEach(async (e) => {
		await import(`./plugins/boot/${e}.js`).then((plugin) => {
			plugin.default();
		});
	});
}

if (config.get().plugins.incoming) {
	config.get().plugins.incoming.forEach((e) => {
		Logger.info('plugin', `registered incoming plugin ${e}`);
	});
}

if (config.get().plugins.outgoing) {
	config.get().plugins.outgoing.forEach((e) => {
		Logger.info('plugin', `registered outgoing plugin ${e}`);
	});
}

for (let i = 0; i < config.get().workers.count; i++) {
	cluster.fork();
}

cluster.on('online', (worker) => {
	Logger.info('boot', 'worker ' + worker.id + ' is now online');
});

/*
cluster.on('exit', (worker, code, signal) => {
	Logger.error(
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
	Logger.error(
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
		Logger.info(
			'main',
			'server started as ' +
				config.get().url +
				' on port ' +
				config.get().port
		);
	}
});
