import process from 'node:process';

process.title = 'Aster';

import config from './utils/config';
import logger from './utils/logger';
import pkg from '../../../package.json';

console.log('            _____ _______ ______ _____  ');
console.log('     /\\    / ____|__   __|  ____|  __ \\ ');
console.log('    /  \\  | (___    | |  | |__  | |__) |');
console.log('   / /\\ \\  \\___ \\   | |  |  __| |  _  / ');
console.log('  / ____ \\ ____) |  | |  | |____| | \\ \\ ');
console.log(' /_/    \\_\\_____/   |_|  |______|_|  \\_\\');
console.log('                                        ');

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(' ');

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

import { inject, errorHandler } from 'express-custom-error';
inject();

import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import requestLogger from './utils/requestLogger';

import router from './routes/router';

const app = express();

app.use(requestLogger.dev, requestLogger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors());

app.use('/', router);

app.use(errorHandler());

app.use('*', (req, res) => {
	res.status(404).json({ message: 'not found' });
});

app.listen(config.port, () =>
	logger(
		'info',
		'core',
		`started instance as ${config.url} on port ${config.port}`
	)
);
