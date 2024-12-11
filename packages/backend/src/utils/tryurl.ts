export default function tryurl(string: string) {
	let url: URL;
	try {
		url = new URL(string);
	} catch (err) {
		/* empty */
	}
	return url;
}
