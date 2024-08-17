import Sonic from 'sonic-channel';

import config from '../config.js';
import logger from '../logger.js';

let ingest;

if (!config.sonic.host) {
	logger('fatal', 'core', 'no sonic host configured');
} else if (!config.sonic.port) {
	logger('fatal', 'core', 'no sonic port configured');
}

let sonicConnection = {
	host: config.sonic.host,
	port: Number(config.sonic.port)
};

if (config.sonic.auth) {
	sonicConnection['auth'] = config.sonic.auth;
}

ingest = new Sonic.Ingest(sonicConnection);

ingest.connect({
	connected: function () {
		logger('debug', 'sonic', 'connected to ingest');
	},

	disconnected: function () {
		logger('debug', 'sonic', 'disconnected from ingest');
	},

	timeout: function () {
		logger('debug', 'sonic', 'ingest connection timed out');
	},

	retrying: function () {
		logger('debug', 'sonic', 'trying to reconnect to ingest...');
	},

	error: function (error) {
		logger('error', 'sonic', 'failed to connect to ingest');
		logger('error', 'sonic', error);
	}
});

export default ingest;
