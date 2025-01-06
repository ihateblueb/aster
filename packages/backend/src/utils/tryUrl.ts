export default function tryUrl(string: string) {
	let url: URL;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url;
}
