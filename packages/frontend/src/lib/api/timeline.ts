import https from '$lib/https';

export default async function getTimeline(timeline: string) {
	return await https.get('/api/timeline/' + timeline, true);
}
