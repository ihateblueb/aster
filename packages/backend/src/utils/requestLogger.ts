import Logger from './logger.js';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';

const logDirectory = path.resolve('../../../../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('requests.log', {
	interval: '1d',
	path: logDirectory
});

export default {
	dev: morgan(function (tokens, req, res) {
		// ignore sveltekit files
		if (
			!tokens.url(req, res).startsWith('/_app/') &&
			!tokens
				.url(req, res)
				.startsWith('/admin/queue/dashboard/api/queues') &&
			!tokens.url(req, res).startsWith('/admin/queue/dashboard/static')
		) {
			Logger.http(
				tokens.method(req, res),
				`${tokens.url(req, res)} responded ${tokens.status(req, res)} in ${tokens['response-time'](req, res) + 'ms'}`
			);
		}
	}),
	combined: morgan('combined', { stream: accessLogStream })
};
