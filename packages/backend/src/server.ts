import process from 'node:process';

process.title = 'Aster';

import pkg from '../../../package.json' assert { type: 'json' };

console.log('            _____ _______ ______ _____  ');
console.log('     /\\    / ____|__   __|  ____|  __ \\ ');
console.log('    /  \\  | (___    | |  | |__  | |__) |');
console.log('   / /\\ \\  \\___ \\   | |  |  __| |  _  / ');
console.log('  / ____ \\ ____) |  | |  | |____| | \\ \\ ');
console.log(' /_/    \\_\\_____/   |_|  |______|_|  \\_\\');
console.log('                                        ');

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(' ');

import config from './utils/config.js';
import logger from './utils/logger.js';

if (!config.nodeadmin) {
	logger(
		'warn',
		'core',
		'its a good idea to specify your admin name in configuration'
	);
}

if (!config.nodeadmincontact) {
	logger(
		'warn',
		'core',
		'its a good idea to specify your admin contact in configuration'
	);
}

import express from 'express';
import { handler } from 'frontend/build/handler.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import requestLogger from './utils/requestLogger.js';

import router from './routes/router.js';

const app = express();

app.use(requestLogger.dev, requestLogger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors());

app.use('/', router);

app.use('*', handler);

app.listen(config.port, () =>
	logger(
		'info',
		'core',
		`started instance as ${config.url} on port ${config.port}`
	)
);
