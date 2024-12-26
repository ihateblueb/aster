import https from '$lib/https';

export default async function getNotifications(
	timeline: string,
	since?: string
) {
	return await https.get(
		'/api/notifications/' + timeline + (since ? '?since=' + since : ''),
		true
	);
}
