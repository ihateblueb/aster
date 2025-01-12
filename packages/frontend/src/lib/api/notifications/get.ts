import https from '$lib/https';

export default async function getNotifications(
	timeline: string,
	since?: string
) {
	return await https.get(
		'/api/notifications' +
			(timeline
				? timeline === 'mentions'
					? '?mentions=true'
					: '?direct=true'
				: '') +
			(since
				? timeline === 'direct' || timeline === 'mentions'
					? '&since=' + since
					: '?since=' + since
				: ''),
		true
	);
}
