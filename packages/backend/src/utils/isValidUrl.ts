import logger from './logger.js';

export default function isValidUrl(url: string) {
	let newUrl;

	console.log(url);

	try {
		newUrl = new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}
