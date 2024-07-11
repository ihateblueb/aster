import logger from './logger.js';

export default function isValidUrl(url: string) {
	let newUrl;

	if (url === 'localhost') {
		logger('error', 'validation', 'stopped request to localhost');
		return false;
	} else if (url === '0.0.0.0') {
		logger('error', 'validation', 'stopped request to 0.0.0.0');
		return false;
	} else if (url === '::1') {
		logger('error', 'validation', 'stopped request to ::1');
		return false;
	} else if (url === '127.0.0.1') {
		logger('error', 'validation', 'stopped request to 127.0.0.1');
		return false;
	} else if (url.startsWith('192.168')) {
		logger('error', 'validation', 'stopped request to 192.168.x.x');
		return false;
	}

	try {
		newUrl = new URL('https://' + url);
		logger('debug', 'validation', 'allowed request to ' + url);
		return true;
	} catch (e) {
		logger('error', 'validation', 'stopped request to ' + url);
		console.log(e);
		return false;
	}
}
