import process from 'node:process';

process.title = 'Aster';

console.log('            _____ _______ ______ _____  ');
console.log('     /\\    / ____|__   __|  ____|  __ \\ ');
console.log('    /  \\  | (___    | |  | |__  | |__) |');
console.log('   / /\\ \\  \\___ \\   | |  |  __| |  _  / ');
console.log('  / ____ \\ ____) |  | |  | |____| | \\ \\ ');
console.log(' /_/    \\_\\_____/   |_|  |______|_|  \\_\\');
console.log('                                        ');

import pkg from '../../../package.json' assert { type: 'json' };

console.log(`starting ${pkg.name} v${pkg.version} by ${pkg.author}...`);
console.log(' ');

import config from './utils/config.js';

if (!config.nodeadmin) {
	console.log(
		'[warn] its a good idea to specify your admin name in configuration'
	);
}

if (!config.nodeadmincontact) {
	console.log(
		'[warn] its a good idea to specify your admin contact information in configuration'
	);
}

import { inject, errorHandler } from 'express-custom-error';
inject();

import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './utils/requestLogger.js';

import router from './routes/router.js';

const app = express();

app.use(logger.dev, logger.combined);
app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors());

app.use('/', router);

app.use(errorHandler());

app.use('*', (req, res) => {
	res.status(404).json({ message: 'not found' });
});

app.listen(config.port, () =>
	console.info(
		`[backend] started instance as ${config.url} (port ${config.port})`
	)
);
