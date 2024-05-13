import morgan from 'morgan';
import logger from './logger.js';
import rfs from 'rotating-file-stream';
import path from 'path';
import fs from 'fs';

const logDirectory = path.resolve('../../../../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('requests.log', {
	interval: '1d',
	path: logDirectory
});

export default {
	dev: morgan(function (tokens, req, res) {
		logger(
			'http',
			tokens.method(req, res),
			`${tokens.url(req, res)} responded ${tokens.status(req, res)} in ${tokens['response-time'](req, res) + 'ms'}`
		);
	}),
	combined: morgan('combined', { stream: accessLogStream })
};
