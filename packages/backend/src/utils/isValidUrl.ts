import Logger from './logger.js';

export default function isValidUrl(url: string) {
	let newUrl;

	if (url === 'localhost') {
		Logger.debug('validation', 'stopped request to localhost');
		return false;
	} else if (url.startsWith('localhost')) {
		Logger.debug('validation', 'stopped request to localhost:*');
		return false;
	} else if (url === '0.0.0.0') {
		Logger.debug('validation', 'stopped request to 0.0.0.0');
		return false;
	} else if (url === '::1') {
		Logger.debug('validation', 'stopped request to ::1');
		return false;
	} else if (url.startsWith('127')) {
		Logger.debug('validation', 'stopped request to 127.*.*.*');
		return false;
	} else if (url.startsWith('192.168')) {
		Logger.debug('validation', 'stopped request to 192.168.*.*');
		return false;
	} else if (!url.includes('.')) {
		Logger.debug('validation', 'stopped request to ' + url);
		return false;
	} else if (url.startsWith('@')) {
		Logger.debug('validation', 'stopped request to ' + url);
		return false;
	}

	try {
		newUrl = new URL('https://' + url);
		Logger.debug('validation', 'allowed request to ' + url);
		return true;
	} catch (e) {
		Logger.debug('validation', 'stopped request to ' + url);
		return false;
	}
}
