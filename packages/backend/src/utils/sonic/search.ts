import Sonic from 'sonic-channel';

import config from '../config.js';
import logger from '../logger.js';

let search;

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

search = new Sonic.Search(sonicConnection);

search.connect({
	connected: function () {
		logger('debug', 'sonic', 'connected to search');
	},

	disconnected: function () {
		logger('debug', 'sonic', 'disconnected from search');
	},

	timeout: function () {
		logger('debug', 'sonic', 'search connection timed out');
	},

	retrying: function () {
		logger('debug', 'sonic', 'trying to reconnect to search...');
	},

	error: function (error) {
		logger('error', 'sonic', 'failed to connect to search');
		logger('error', 'sonic', error);
	}
});

export default search;
