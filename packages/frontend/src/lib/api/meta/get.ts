import https from '$lib/https';

export default function getMeta() {
	return https.get(`/meta`, false);
}
