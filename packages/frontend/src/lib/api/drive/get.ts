import https from '$lib/https';

export default function getDrive(since?: string) {
	return https.get(`/api/drive` + (since ? '?since=' + since : ''), true);
}
