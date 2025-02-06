import https from '$lib/https';

export default function getEmojis() {
	return https.get(`/api/emojis`, true);
}
