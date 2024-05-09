import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import path from 'path';
import fs from 'fs';

const logDirectory = path.resolve(__dirname, '../../../../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('requests.log', {
	interval: '1d',
	path: logDirectory
});

export default {
	dev: morgan('dev'),
	combined: morgan('combined', { stream: accessLogStream })
};
