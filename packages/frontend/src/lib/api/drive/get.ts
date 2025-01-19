import https from '$lib/https';

export default function getDrive(timeline: string, since?: string) {
	return https.get(`/api/drive` + (since ? '?since=' + since : ''), true);
}
