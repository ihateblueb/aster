import Sonic from 'sonic-channel';

import config from '../config.js';
import Logger from '../logger.js';

let search;

if (!config.sonic.host) {
	Logger.fatal('core', 'no sonic host configured');
} else if (!config.sonic.port) {
	Logger.fatal('core', 'no sonic port configured');
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
		Logger.debug('sonic', 'connected to search');
	},

	disconnected: function () {
		Logger.debug('sonic', 'disconnected from search');
	},

	timeout: function () {
		Logger.debug('sonic', 'search connection timed out');
	},

	retrying: function () {
		Logger.debug('sonic', 'trying to reconnect to search...');
	},

	error: function (error) {
		Logger.error('sonic', 'failed to connect to search');
		Logger.error('sonic', error);
	}
});

export default search;
