import logger from './logger.js';

export default function isValidUrl(url: string) {
	let newUrl;

	if (url === 'localhost') {
		logger.debug('validation', 'stopped request to localhost');
		return false;
	} else if (url.startsWith('localhost')) {
		logger.debug('validation', 'stopped request to localhost:*');
		return false;
	} else if (url === '0.0.0.0') {
		logger.debug('validation', 'stopped request to 0.0.0.0');
		return false;
	} else if (url === '::1') {
		logger.debug('validation', 'stopped request to ::1');
		return false;
	} else if (url.startsWith('127')) {
		logger.debug('validation', 'stopped request to 127.*.*.*');
		return false;
	} else if (url.startsWith('192.168')) {
		logger.debug('validation', 'stopped request to 192.168.*.*');
		return false;
	} else if (!url.includes('.')) {
		logger.debug('validation', 'stopped request to ' + url);
		return false;
	} else if (url.startsWith('@')) {
		logger.debug('validation', 'stopped request to ' + url);
		return false;
	}

	try {
		newUrl = new URL('https://' + url);
		logger.debug('validation', 'allowed request to ' + url);
		return true;
	} catch (e) {
		logger.debug('validation', 'stopped request to ' + url);
		return false;
	}
}
