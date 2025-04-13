import https from '$lib/https';

export default async function getFollowRequests(since?: string) {
	return https.get(
		`/api/follow-requests` + (since ? '?since=' + since : ''),
		true
	);
}
