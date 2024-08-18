import Sonic from 'sonic-channel';

import config from '../config.js';
import Logger from '../logger.js';

let ingest;

if (!config.get().sonic.host) {
	Logger.fatal('core', 'no sonic host configured');
} else if (!config.get().sonic.port) {
	Logger.fatal('core', 'no sonic port configured');
}

let sonicConnection = {
	host: config.get().sonic.host,
	port: Number(config.get().sonic.port)
};

if (config.get().sonic.auth) {
	sonicConnection['auth'] = config.get().sonic.auth;
}

ingest = new Sonic.Ingest(sonicConnection);

ingest.connect({
	connected: function () {
		Logger.debug('sonic', 'connected to ingest');
	},

	disconnected: function () {
		Logger.debug('sonic', 'disconnected from ingest');
	},

	timeout: function () {
		Logger.debug('sonic', 'ingest connection timed out');
	},

	retrying: function () {
		Logger.debug('sonic', 'trying to reconnect to ingest...');
	},

	error: function (error) {
		Logger.error('sonic', 'failed to connect to ingest');
		Logger.error('sonic', error);
	}
});

export default ingest;
