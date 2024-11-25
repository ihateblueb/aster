import https from '$lib/https';

export default function lookupUser(handle: string) {
	return https.get(`/api/user/lookup/${handle}`, true);
}
