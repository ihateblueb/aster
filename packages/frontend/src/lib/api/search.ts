import https from '$lib/https';

export default function search(query: string, since?: string) {
	return https.get(
		`/api/search?query=${query}` + (since ? '&since=' + since : ''),
		true
	);
}
