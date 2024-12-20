import https from '$lib/https';

export default function getMeta() {
	return https.get(`/api/meta`, false);
}
