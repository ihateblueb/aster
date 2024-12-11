import https from '$lib/https';

export default async function getTimeline(timeline: string, since?: string) {
	return await https.get(
		'/api/timeline/' + timeline + (since ? '?since=' + since : ''),
		true
	);
}
