export default function isValidUrl(url: string) {
	let newUrl;

	try {
		newUrl = new URL(url);
	} catch (e) {
		return false;
	}

	return true;
}
